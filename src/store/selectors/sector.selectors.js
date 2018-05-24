import { createSelector } from 'reselect';

import {
  currentSectorSelector,
  sectorSelector,
  savedSectorSelector,
  shareSectorSelector,
} from 'store/selectors/base.selectors';
import { omitBy, includes } from 'constants/lodash';

export const getUserSectors = createSelector(
  [sectorSelector, savedSectorSelector],
  (sectors, saved) => omitBy(sectors, (sector, key) => !includes(saved, key)),
);

export const isCurrentSectorSaved = createSelector(
  [currentSectorSelector, savedSectorSelector],
  (currentSector, saved) => includes(saved, currentSector),
);

export const isViewingSharedSector = createSelector(
  [currentSectorSelector, shareSectorSelector],
  (currentSector, share) => currentSector === share,
);
