import { filter, zipObject } from 'lodash';
import { createSelector } from 'reselect';

const generatedSelector = state => state.sector.generated;
const savedSelector = state => state.sector.saved;
const currentSectorSelector = state => state.sector.currentSector;

export const getCurrentSector = createSelector(
  [generatedSelector, savedSelector, currentSectorSelector],
  (generated, saved, currentSector) => {
    if (currentSector === 'generated') {
      return { ...generated } || {};
    }
    return { ...saved[currentSector] } || {};
  },
);

export const getUserSectors = createSelector([savedSelector], saved => {
  const filtered = filter(saved, save => !save.isCloudSave);
  return zipObject(filtered.map(save => save.key), filtered);
});
