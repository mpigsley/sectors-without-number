import { createSelector } from 'reselect';
import validateImportJson from 'utils/import-json-validator';

import {
  isInitializedSelector,
  currentSectorSelector,
  sectorSelector,
  savedSectorSelector,
  shareSectorSelector,
  fetchedSectorSelector,
  playerViewSelector,
  importJsonSelector,
} from 'store/selectors/base.selectors';
import { omitBy, includes, map } from 'constants/lodash';

export const getUserSectors = createSelector(
  [sectorSelector, savedSectorSelector],
  (sectors, saved) => omitBy(sectors, (sector, key) => !includes(saved, key)),
);

export const isCurrentSectorSaved = createSelector(
  [currentSectorSelector, savedSectorSelector],
  (currentSector, saved) => includes(saved, currentSector),
);

export const isCurrentSectorFetched = createSelector(
  [currentSectorSelector, fetchedSectorSelector],
  (currentSector, fetched) => includes(fetched, currentSector),
);

export const isSharedSector = createSelector(
  [currentSectorSelector, shareSectorSelector],
  (currentSector, share) => currentSector === share,
);

export const isViewingSharedSector = createSelector(
  [isSharedSector, playerViewSelector],
  (isShared, isPlayerView) => isShared || isPlayerView,
);

export const currentSectorIsLoading = createSelector(
  [isInitializedSelector, isCurrentSectorFetched],
  (isInitialized, isCurrentFetched) => !isInitialized || !isCurrentFetched,
);

export const importDataSelector = createSelector(
  [importJsonSelector],
  jsonStr => {
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return undefined;
    }
  },
);

export const importIsDataValidSelector = createSelector(
  [importDataSelector],
  data => !!data && validateImportJson(data),
);

export const importSectorsSelector = createSelector(
  [importDataSelector, importIsDataValidSelector],
  (data, valid) => {
    if (valid) {
      return map(data.sector, (value, key) => ({
        value: key,
        label: value.name,
      }));
    }
    return [];
  },
);
