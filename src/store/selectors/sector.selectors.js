import { omitBy } from 'lodash';
import { createSelector } from 'reselect';

export const currentSectorSelector = state => state.sector.currentSector;
export const currentEntitySelector = state => state.sector.currentEntity;
export const sectorEntitySelector = state => state.entity.sector;

export const getCurrentSector = createSelector(
  [currentSectorSelector, sectorEntitySelector],
  (currentSector, sectorEntity) => sectorEntity[currentSector],
);

export const getUserSectors = createSelector([sectorEntitySelector], sectors =>
  omitBy(sectors, sector => sector.isCloudSave),
);
