import { createSelector } from 'reselect';

const generatedSelector = state => state.sector.generated;
const savedSelector = state => state.sector.saved;
const currentSectorSelector = state => state.sector.currentSector;

// eslint-disable-next-line import/prefer-default-export
export const getCurrentSector = createSelector(
  [generatedSelector, savedSelector, currentSectorSelector],
  (generated, saved, currentSector) => {
    if (currentSector === 'generated') {
      return generated || {};
    }
    return saved[currentSector] || {};
  },
);
