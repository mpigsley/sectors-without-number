import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';

import {
  currentEntitySelector,
  currentSectorSelector,
  factionsSelector,
  factionFormSelector,
} from 'store/selectors/base.selectors';

export const currentSectorFactions = createSelector(
  [currentSectorSelector, factionsSelector],
  (sector, layers) => (layers || {})[sector] || {},
);

export const currentFaction = createSelector(
  [currentSectorFactions, currentEntitySelector],
  (factions, current) => (factions || {})[current],
);

export const isValidFactionForm = createSelector(
  [factionFormSelector],
  ({ name }) => !!name && name.length <= LAYER_NAME_LENGTH,
);
