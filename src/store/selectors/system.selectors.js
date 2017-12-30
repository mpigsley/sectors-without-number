import { createSelector } from 'reselect';
import { pickBy } from 'lodash';

import {
  systemSelector,
  currentSectorSelector,
} from 'store/selectors/base.selectors';

export const getCurrentSystems = createSelector(
  [systemSelector, currentSectorSelector],
  (systems, currentSector) =>
    pickBy(systems, system => system.sector === currentSector),
);
