import { createSelector } from 'reselect';

export const asteroidBaseSelector = state => state.entity.asteroidBase;
export const asteroidBeltSelector = state => state.entity.asteroidBelt;
export const blackHoleSelector = state => state.entity.blackHole;
export const deepSpaceStationSelector = state => state.entity.deepSpaceStation;
export const gasGiantMineSelector = state => state.entity.gasGiantMine;
export const moonSelector = state => state.entity.moon;
export const moonBaseSelector = state => state.entity.moonBase;
export const orbitalRuinSelector = state => state.entity.orbitalRuin;
export const planetSelector = state => state.entity.planet;
export const refuelingStationSelector = state => state.entity.refuelingStation;
export const researchBaseSelector = state => state.entity.researchBase;
export const sectorSelector = state => state.entity.sector;
export const spaceStationSelector = state => state.entity.spaceStation;
export const systemSelector = state => state.entity.system;

export const getTopLevelEntities = createSelector(
  [
    systemSelector,
    deepSpaceStationSelector,
    asteroidBeltSelector,
    blackHoleSelector,
  ],
  (systems, deepSpaceStations, asteroidBases, blackHoles) => ({
    ...systems,
    ...deepSpaceStations,
    ...asteroidBases,
    ...blackHoles,
  }),
);
