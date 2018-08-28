import { createSelector } from 'reselect';

import { pickBy } from 'constants/lodash';
import { LAYER_NAME_LENGTH } from 'constants/defaults';

import {
  currentEntitySelector,
  currentSectorSelector,
  factionsSelector,
  factionFormSelector,
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

export const isValidFactionForm = createSelector(
  [factionFormSelector],
  ({ name }) => !!name && name.length <= LAYER_NAME_LENGTH,
);
