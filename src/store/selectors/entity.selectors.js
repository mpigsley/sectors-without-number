import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from 'reselect';

import {
  currentSectorSelector,
  currentEntityTypeSelector,
  currentEntitySelector,
  entitySelector,
  isSidebarEditActiveSelector,
  sidebarEditEntitySelector,
  sidebarEditChildrenSelector,
  savedSectorSelector,
  layersSelector,
} from 'store/selectors/base.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import Entities from 'constants/entities';
import { allSectorKeys, coordinateKey } from 'utils/common';
import { areNeighbors } from 'utils/hex/common';
import {
  omit,
  filter,
  pickBy,
  mapValues,
  zipObject,
  difference,
  values,
  includes,
  isEqual,
  flatten,
  map,
  size,
} from 'constants/lodash';

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const getSavedEntities = createDeepEqualSelector(
  [entitySelector, savedSectorSelector],
  (entities, savedSectors) =>
    mapValues(entities, entityList =>
      pickBy(entityList, ({ sector }) => includes(savedSectors, sector)),
    ),
);

export const getAllTopLevelEntities = createSelector(
  [currentSectorSelector, entitySelector],
  (currentSector, entities) =>
    Object.assign(
      ...filter(Entities, ({ topLevel }) => topLevel).map(({ key }) =>
        mapValues(
          pickBy(entities[key], ({ sector }) => sector === currentSector),
          (entity, entityId) => ({
            ...entity,
            type: key,
            numChildren: Entities[key].children.reduce(
              (total, childKey) =>
                total +
                filter(entities[childKey], ({ parent }) => parent === entityId)
                  .length,
              0,
            ),
          }),
        ),
      ),
    ),
);

export const getCurrentTopLevelEntities = createSelector(
  [currentSectorSelector, entitySelector, isViewingSharedSector],
  (currentSector, entities, isShared) =>
    Object.assign(
      ...filter(Entities, ({ topLevel }) => topLevel).map(({ key }) =>
        mapValues(
          pickBy(
            entities[key],
            ({ sector, isHidden }) =>
              sector === currentSector && (!isShared || !isHidden),
          ),
          (entity, entityId) => ({
            ...entity,
            type: key,
            numChildren: Entities[key].children.reduce(
              (total, childKey) =>
                total +
                filter(
                  entities[childKey],
                  ({ parent, isHidden }) =>
                    parent === entityId && (!isShared || !isHidden),
                ).length,
              0,
            ),
          }),
        ),
      ),
    ),
);

export const getCurrentEntities = createDeepEqualSelector(
  [currentSectorSelector, entitySelector, isViewingSharedSector],
  (currentSector, entities, isShared) =>
    mapValues(entities, entityList =>
      pickBy(entityList, (entity, entityId) => {
        if (entity.sector !== currentSector && entityId !== currentSector) {
          return false;
        } else if (!isShared) {
          return true;
        }
        let { isHidden } = entity;
        let currentEntity = entity;
        while (!isHidden && currentEntity) {
          isHidden = currentEntity.isHidden; // eslint-disable-line
          currentEntity = (entities[currentEntity.parentEntity] || {})[
            currentEntity.parent
          ];
        }
        return !isHidden;
      }),
    ),
);

export const getCurrentSector = createDeepEqualSelector(
  [currentSectorSelector, entitySelector],
  (currentSector, entities) => entities[Entities.sector.key][currentSector],
);

export const getMapLock = createDeepEqualSelector(
  [getCurrentSector],
  currentSector => !!(currentSector || {}).mapLocked,
);

export const getSectorLayers = createDeepEqualSelector(
  [getCurrentSector],
  currentSector => (currentSector || {}).layers || {},
);

export const getCurrentEntity = createSelector(
  [
    currentSectorSelector,
    currentEntityTypeSelector,
    currentEntitySelector,
    entitySelector,
    isSidebarEditActiveSelector,
    sidebarEditEntitySelector,
    layersSelector,
  ],
  (
    currentSector,
    currentEntityType,
    currentEntity,
    entities,
    isSidebarEditActive,
    sidebarEditEntity,
    layers,
  ) => {
    if (isSidebarEditActive) {
      return sidebarEditEntity;
    }
    if (currentEntityType === Entities.layer.key) {
      return !currentEntity
        ? entities[Entities.sector.key][currentSector]
        : (layers[currentSector] || {})[currentEntity];
    }
    const isNavigation = currentEntityType === Entities.navigation.key;
    return !currentEntity || isNavigation
      ? entities[Entities.sector.key][currentSector]
      : entities[currentEntityType][currentEntity];
  },
);

export const getActiveEntityKey = createDeepEqualSelector(
  [entitySelector, getCurrentEntity],
  (entities, currentEntity = {}) => {
    let entity = currentEntity;
    let isEntityTopLevel = entity.x;
    while (!isEntityTopLevel && entity) {
      entity = (entities[entity.parentEntity] || {})[entity.parent];
      isEntityTopLevel = (entity || {}).x;
    }
    return isEntityTopLevel ? coordinateKey(entity.x, entity.y) : undefined;
  },
);

export const getCurrentEntityType = createDeepEqualSelector(
  [currentEntityTypeSelector],
  currentEntityType => currentEntityType || Entities.sector.key,
);

export const getCurrentEntityId = createDeepEqualSelector(
  [currentSectorSelector, currentEntitySelector],
  (currentSector, currentEntity) => currentEntity || currentSector,
);

export const getCurrentEntityChildren = createDeepEqualSelector(
  [
    getCurrentEntityId,
    getCurrentEntityType,
    entitySelector,
    isViewingSharedSector,
  ],
  (entityId, currentEntityType, entities, isShared) => {
    const entityChildren = Entities[currentEntityType].children;
    return zipObject(
      entityChildren,
      entityChildren.map(entityType =>
        pickBy(
          entities[entityType],
          ({ parent, isHidden }) =>
            parent === entityId && (!isShared || !isHidden),
        ),
      ),
    );
  },
);

export const getEmptyHexKeys = createDeepEqualSelector(
  [getCurrentSector, sidebarEditChildrenSelector],
  ({ rows, columns }, children = {}) =>
    difference(
      allSectorKeys(columns, rows),
      values(Object.assign({}, ...values(children))).map(({ x, y }) =>
        coordinateKey(x, y),
      ),
    ),
);

export const isAncestorHidden = createDeepEqualSelector(
  [getCurrentEntityId, getCurrentEntityType, entitySelector],
  (currentEntityId, currentEntityType, entities) => {
    const currentEntity = entities[currentEntityType][currentEntityId];
    if (!currentEntity || currentEntityType === Entities.sector.key) {
      return false;
    }
    let thisEntity = {
      ...entities[currentEntity.parentEntity][currentEntity.parent],
    };
    let thisEntityType = currentEntity.parentEntity;
    let isHidden = !!thisEntity.isHidden;
    while (thisEntityType !== Entities.sector.key && !isHidden) {
      isHidden = !!thisEntity.isHidden;
      thisEntityType = thisEntity.parentEntity;
      thisEntity = {
        ...entities[thisEntityType][thisEntity.parent],
      };
    }
    return isHidden;
  },
);

export const isCurrentOrAncestorHidden = createDeepEqualSelector(
  [isAncestorHidden, getCurrentEntityId, getCurrentEntityType, entitySelector],
  (ancestorHidden, currentEntityId, currentEntityType, entities) =>
    currentEntityType !== Entities.sector.key &&
    (ancestorHidden || !!entities[currentEntityType][currentEntityId].isHidden),
);

export const getEntityChildren = createDeepEqualSelector(
  [getCurrentEntities],
  currentEntities =>
    flatten(
      values(omit(currentEntities, Entities.sector.key)).map(values),
    ).reduce(
      (mapping, entity) => ({
        ...mapping,
        [entity.parent]: (mapping[entity.parent] || 0) + 1,
      }),
      {},
    ),
);

export const getEntityNeighbors = createDeepEqualSelector(
  [getCurrentEntities],
  currentEntities =>
    map(
      Object.assign(
        {},
        ...values(
          pickBy(
            currentEntities,
            (entities, entityType) => Entities[entityType].topLevel,
          ),
        ),
      ),
      (entity, entityId) => ({ ...entity, entityId }),
    ).reduce(
      (mapping, entity, i, entities) => ({
        ...mapping,
        [entity.entityId]: entities
          .filter(
            b => areNeighbors(entity, b) && b.entityId !== entity.entityId,
          )
          .map(({ entityId, ...rest }) => rest),
      }),
      {},
    ),
);

export const getPrintableEntities = createDeepEqualSelector(
  [
    getCurrentEntities,
    getEntityChildren,
    getEntityNeighbors,
    currentSectorSelector,
    isViewingSharedSector,
  ],
  (currentEntities, entityChildren, entityNeighbors, currentSector, isShared) =>
    mapValues(
      pickBy(omit(currentEntities, Entities.sector.key), size),
      (entities, entityType) =>
        mapValues(
          pickBy(
            entities,
            entity => currentEntities[entity.parentEntity][entity.parent],
          ),
          (entity, entityId) => ({
            ...zipObject(
              (Entities[entityType].attributes || []).map(({ key }) => key),
              (Entities[entityType].attributes || []).map(
                ({ key, attributes }) =>
                  isShared && (entity.visibility || {})[`attr.${key}`] === false
                    ? undefined
                    : (attributes[(entity.attributes || {})[key]] || {}).name ||
                      (entity.attributes || {})[key],
              ),
            ),
            tags: ((entity.attributes || {}).tags || []).filter(
              tag =>
                !isShared || (entity.visibility || {})[`tag.${tag}`] !== false,
            ),
            description: (entity.attributes || {}).description,
            key: entityId,
            name: entity.name,
            link: `/sector/${currentSector}/${entityType}/${entityId}`,
            location: Entities[entityType].topLevel
              ? coordinateKey(entity.x, entity.y)
              : undefined,
            children: entityChildren[entityId] || 0,
            parent: currentEntities[entity.parentEntity][entity.parent].name,
            parentType: Entities[entity.parentEntity].name,
            parentLink: `/sector/${currentSector}${
              entity.parentEntity !== Entities.sector.key
                ? `/${entity.parentEntity}/${entity.parent}`
                : ''
            }`,
            neighbors: Entities[entityType].topLevel
              ? entityNeighbors[entityId].map(({ name }) => name).join(', ')
              : undefined,
          }),
        ),
    ),
);
