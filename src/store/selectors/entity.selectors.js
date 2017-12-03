import { createSelector } from 'reselect';
import { filter, pickBy, mapValues, zipObject } from 'lodash';

import {
  currentSectorSelector,
  currentEntityTypeSelector,
  currentEntitySelector,
  entitySelector,
  isSidebarEditActiveSelector,
  sidebarEditEntitySelector,
} from 'store/selectors/base.selectors';
import Entities from 'constants/entities';

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
  [getCurrentEntityId, getCurrentEntityType, entitySelector],
  (entityId, currentEntityType, entities) => {
    const entityChildren = Entities[currentEntityType].children;
    return zipObject(
      entityChildren,
      entityChildren.map(entityType =>
        pickBy(entities[entityType], ({ parent }) => parent === entityId),
      ),
    );
  },
);
