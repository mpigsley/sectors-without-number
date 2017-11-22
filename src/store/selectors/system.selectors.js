import { createSelector } from 'reselect';
import { difference, pickBy, values } from 'lodash';

import { allSectorKeys, coordinateKey } from 'utils/common';
import { getCurrentSector } from 'store/selectors/sector.selectors';
import {
  systemSelector,
  currentSectorSelector,
} from 'store/selectors/base.selectors';

export const getCurrentSystems = createSelector(
  [systemSelector, currentSectorSelector],
  (systems, currentSector) =>
    pickBy(systems, system => system.sector === currentSector),
);

export const getCurrentSystem = createSelector(
  [getCurrentSystems, currentSectorSelector],
  (systems, entity) => systems[entity] || {},
);

export const getEmptySystemKeys = createSelector(
  [getCurrentSector, getCurrentSystems],
  ({ rows, columns }, systems) =>
    difference(
      allSectorKeys(columns, rows),
      values(systems).map(({ x, y }) => coordinateKey(x, y)),
    ),
);
