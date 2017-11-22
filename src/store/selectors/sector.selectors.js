import { omitBy } from 'lodash';
import { createSelector } from 'reselect';

import {
  currentSectorSelector,
  sectorSelector,
} from 'store/selectors/base.selectors';

export const getCurrentSector = createSelector(
  [currentSectorSelector, sectorSelector],
  (currentSector, sectorEntity) => sectorEntity[currentSector],
);

export const getUserSectors = createSelector([sectorSelector], sectors =>
  omitBy(sectors, sector => sector.isCloudSave),
);
