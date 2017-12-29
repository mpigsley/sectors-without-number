import { omitBy, difference, values, includes } from 'lodash';
import { createSelector } from 'reselect';

import { allSectorKeys, coordinateKey } from 'utils/common';
import {
  currentSectorSelector,
  sectorSelector,
  sidebarEditChildrenSelector,
  savedSectorSelector,
} from 'store/selectors/base.selectors';

export const getCurrentSector = createSelector(
  [currentSectorSelector, sectorSelector],
  (currentSector, sectorEntity) => sectorEntity[currentSector],
);

export const getUserSectors = createSelector([sectorSelector], sectors =>
  omitBy(sectors, sector => sector.isCloudSave),
);

export const isCurrentSectorSaved = createSelector(
  [currentSectorSelector, savedSectorSelector],
  (currentSector, saved) => includes(saved, currentSector),
);

export const getEmptyHexKeys = createSelector(
  [getCurrentSector, sidebarEditChildrenSelector],
  ({ rows, columns }, children) =>
    difference(
      allSectorKeys(columns, rows),
      values(Object.assign(...values(children))).map(({ x, y }) =>
        coordinateKey(x, y),
      ),
    ),
);
