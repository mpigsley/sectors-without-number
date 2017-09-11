import { createSelector } from 'reselect';
import { map } from 'lodash';

import { getCurrentSector } from 'store/selectors/sector.selectors';
import { makeGetCurrentSystem } from 'store/selectors/system.selectors';

const planetRouteSelector = (state, props) =>
  encodeURIComponent(props.routeParams.planet);

export const makeGetCurrentPlanet = () => {
  const getCurrentSystem = makeGetCurrentSystem();
  return createSelector(
    [getCurrentSystem, planetRouteSelector],
    (system, planet) => (system.planets || {})[planet] || {},
  );
};

export const getPlanetKeys = createSelector([getCurrentSector], sector =>
  [].concat(
    ...map(sector.systems, system =>
      [].concat(...map(system.planets, (planet, planetKey) => planetKey)),
    ),
  ),
);
