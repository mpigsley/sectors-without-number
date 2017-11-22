import { createSelector } from 'reselect';
import { pickBy } from 'lodash';

import {
  currentSectorSelector,
  currentEntitySelector,
  planetSelector,
} from 'store/selectors/base.selectors';

export const getCurrentPlanets = createSelector(
  [planetSelector, currentSectorSelector],
  (planets, currentSector) =>
    pickBy(planets, planet => planet.sector === currentSector),
);

export const getCurrentPlanet = createSelector(
  [getCurrentPlanets, currentEntitySelector],
  (planets, entity) => planets[entity],
);

export const getPlanetKeys = createSelector([], () => []);
