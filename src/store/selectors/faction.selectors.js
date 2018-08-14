import { createSelector } from 'reselect';

import { pickBy } from 'constants/lodash';
import {
  currentEntitySelector,
  currentSectorSelector,
  factionsSelector,
} from 'store/selectors/base.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';

export const currentSectorFactions = createSelector(
  [currentSectorSelector, factionsSelector, isViewingSharedSector],
  (sector, layers, isShared) =>
    pickBy(
      (layers || {})[sector] || {},
      ({ isHidden }) => !isShared || !isHidden,
    ),
);

export const currentFaction = createSelector(
  [currentSectorFactions, currentEntitySelector],
  (factions, current) => (factions || {})[current],
);
