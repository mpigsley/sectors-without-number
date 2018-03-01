import { createSelectorCreator, defaultMemoize } from 'reselect';
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
} from 'lodash';

import {
  currentSectorSelector,
  currentEntityTypeSelector,
  currentEntitySelector,
  entitySelector,
  isSidebarEditActiveSelector,
  sidebarEditEntitySelector,
  sidebarEditChildrenSelector,
  savedSectorSelector,
} from 'store/selectors/base.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import Entities from 'constants/entities';
import { allSectorKeys, coordinateKey } from 'utils/common';
import { areNeighbors } from 'utils/hex-generator';

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const getSavedEntities = createDeepEqualSelector(
  [entitySelector, savedSectorSelector],
  (entities, savedSectors) =>
    mapValues(entities, entityList =>
      pickBy(entityList, ({ sector }) => includes(savedSectors, sector)),
    ),
);

export const getCurrentTopLevelEntities = createDeepEqualSelector(
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
      pickBy(
        entityList,
        ({ sector, isHidden }, entityId) =>
          (sector === currentSector || entityId === currentSector) &&
          (!isShared || !isHidden),
      ),
    ),
);

export const getCurrentSector = createDeepEqualSelector(
  [currentSectorSelector, entitySelector],
  (currentSector, entities) => entities[Entities.sector.key][currentSector],
);

export const getCurrentEntity = createDeepEqualSelector(
  [
    currentSectorSelector,
    currentEntityTypeSelector,
    currentEntitySelector,
    entitySelector,
    isSidebarEditActiveSelector,
    sidebarEditEntitySelector,
  ],
  (
    currentSector,
    currentEntityType,
    currentEntity,
    entities,
    isSidebarEditActive,
    sidebarEditEntity,
  ) => {
    if (isSidebarEditActive) {
      return sidebarEditEntity;
    }
    return !currentEntity
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
    if (currentEntityType === Entities.sector.key) {
      return false;
    }
    const currentEntity = entities[currentEntityType][currentEntityId];
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
  [getCurrentEntities, getEntityChildren, getEntityNeighbors],
  (currentEntities, entityChildren, entityNeighbors) =>
    mapValues(
      omit(currentEntities, Entities.sector.key),
      (entities, entityType) =>
        mapValues(entities, (entity, entityId) => ({
          key: entityId,
          name: entity.name,
          location: Entities[entityType].topLevel
            ? coordinateKey(entity.x, entity.y)
            : undefined,
          children: entityChildren[entityId] || 0,
          parent: `${
            currentEntities[entity.parentEntity][entity.parent].name
          } (${Entities[entity.parentEntity].name})`,
          neighbors: Entities[entityType].topLevel
            ? entityNeighbors[entityId].map(({ name }) => name).join(', ')
            : undefined,
        })),
    ),
);
