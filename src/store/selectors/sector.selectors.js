import { createSelector } from 'reselect';
import validateImportJson from 'utils/import-json-validator';

import {
  isInitializedSelector,
  currentSectorSelector,
  sectorSelector,
  savedSectorSelector,
  entitySelector,
  shareSectorSelector,
  fetchedSectorSelector,
  playerViewSelector,
  importJsonSelector,
  importSelectedSectorSelector,
} from 'store/selectors/base.selectors';
import Entities from 'constants/entities';
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
  [importDataSelector, currentSectorSelector, entitySelector],
  (data, currentSector, entities) =>
    !!data &&
    validateImportJson(data, entities[Entities.sector.key][currentSector]),
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

export const importSectorSelector = createSelector(
  [importSectorsSelector, importSelectedSectorSelector],
  (parsedSectors, selectedSector) => {
    if (selectedSector) return selectedSector;
    if (parsedSectors.length) return parsedSectors[0].value;
    return undefined;
  },
);
