import { omitBy } from 'lodash';
import { createSelector } from 'reselect';

import { sectorSelector } from 'store/selectors/entity.selectors';

export const currentSectorSelector = state => state.sector.currentSector;
export const currentEntitySelector = state => state.sector.currentEntity;

export const getCurrentSector = createSelector(
  [currentSectorSelector, sectorSelector],
  (currentSector, sectorEntity) => sectorEntity[currentSector],
);

export const getUserSectors = createSelector([sectorSelector], sectors =>
  omitBy(sectors, sector => sector.isCloudSave),
);
