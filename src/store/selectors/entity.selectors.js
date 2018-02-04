import { createSelector } from 'reselect';
import {
  filter,
  pickBy,
  mapValues,
  zipObject,
  difference,
  values,
} from 'lodash';

import {
  currentSectorSelector,
  currentEntityTypeSelector,
  currentEntitySelector,
  entitySelector,
  isSidebarEditActiveSelector,
  sidebarEditEntitySelector,
  sidebarEditChildrenSelector,
} from 'store/selectors/base.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import Entities from 'constants/entities';
import { allSectorKeys, coordinateKey } from 'utils/common';

export const getCurrentTopLevelEntities = createSelector(
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

export const getCurrentEntities = createSelector(
  [currentSectorSelector, entitySelector],
  (currentSector, entities) =>
    mapValues(entities, entityList =>
      pickBy(
        entityList,
        (entity, entityId) =>
          entity.sector === currentSector || entityId === currentSector,
      ),
    ),
);

export const getCurrentSector = createSelector(
  [currentSectorSelector, entitySelector],
  (currentSector, entities) => entities[Entities.sector.key][currentSector],
);

export const getCurrentEntity = createSelector(
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

export const getCurrentEntityType = createSelector(
  [currentEntityTypeSelector],
  currentEntityType => currentEntityType || Entities.sector.key,
);

export const getCurrentEntityId = createSelector(
  [currentSectorSelector, currentEntitySelector],
  (currentSector, currentEntity) => currentEntity || currentSector,
);

export const getCurrentEntityChildren = createSelector(
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

export const getEmptyHexKeys = createSelector(
  [getCurrentSector, sidebarEditChildrenSelector],
  ({ rows, columns }, children = {}) =>
    difference(
      allSectorKeys(columns, rows),
      values(Object.assign({}, ...values(children))).map(({ x, y }) =>
        coordinateKey(x, y),
      ),
    ),
);

export const isCurrentOrAncestorHidden = createSelector(
  [getCurrentEntityId, getCurrentEntityType, entitySelector],
  (currentEntityId, currentEntityType, entities) => {
    if (currentEntityType === Entities.sector.key) {
      return false;
    }
    let thisEntity = {
      ...entities[currentEntityType][currentEntityId],
    };
    let thisEntityType = currentEntityType;
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
