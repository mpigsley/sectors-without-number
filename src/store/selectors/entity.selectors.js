import { createSelector } from 'reselect';
import { filter, pickBy, mapValues } from 'lodash';

import {
  currentSectorSelector,
  entitySelector,
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

export default getCurrentTopLevelEntities;
