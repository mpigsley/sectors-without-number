import { createSelector } from 'reselect';

const generatedSelector = state => state.sector.generated;
const savedSelector = state => state.sector.saved;
const currentSectorSelector = state => state.sector.currentSector;

const systemRouteSelector = (state, props) => props.routeParams.system;
const planetRouteSelector = (state, props) =>
  encodeURIComponent(props.routeParams.planet);

export const getCurrentSector = createSelector(
  [generatedSelector, savedSelector, currentSectorSelector],
  (generated, saved, currentSector) => {
    if (currentSector === 'generated') {
      return generated || {};
    }
    return saved[currentSector] || {};
  },
);

export const makeGetCurrentSystem = () =>
  createSelector(
    [getCurrentSector, systemRouteSelector],
    (sector, system) => (sector.systems || {})[system] || {},
  );

export const makeGetCurrentPlanet = () => {
  const getCurrentSystem = makeGetCurrentSystem();
  return createSelector(
    [getCurrentSystem, planetRouteSelector],
    (system, planet) => (system.planets || {})[planet] || {},
  );
};
