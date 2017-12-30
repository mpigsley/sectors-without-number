import { createSelector } from 'reselect';
import { pickBy } from 'lodash';

import {
  currentSectorSelector,
  planetSelector,
} from 'store/selectors/base.selectors';

export const getCurrentPlanets = createSelector(
  [planetSelector, currentSectorSelector],
  (planets, currentSector) =>
    pickBy(planets, planet => planet.sector === currentSector),
);
