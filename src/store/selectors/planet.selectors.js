import { createSelector } from 'reselect';
import { pickBy } from 'lodash';

import {
  currentSectorSelector,
  currentEntitySelector,
} from 'store/selectors/sector.selectors';
import { planetSelector } from 'store/selectors/entity.selectors';

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
