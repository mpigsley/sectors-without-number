import { filter, zipObject } from 'lodash';
import { createSelector } from 'reselect';

const savedSelector = state => state.sector.saved;
const currentSectorSelector = state => state.sector.currentSector;
const sectorEntitySelector = state => state.entity.sector;

export const getCurrentSector = createSelector(
  [currentSectorSelector, sectorEntitySelector],
  (currentSector, sectorEntity) => sectorEntity[currentSector],
);

export const getUserSectors = createSelector([savedSelector], saved => {
  const filtered = filter(saved, save => !save.isCloudSave);
  return zipObject(filtered.map(save => save.key), filtered);
});
