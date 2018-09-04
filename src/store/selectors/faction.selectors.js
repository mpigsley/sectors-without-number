import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import { FACTION_ASSETS } from 'constants/faction';
import Entities from 'constants/entities';
import { map } from 'constants/lodash';

import {
  entitySelector,
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

export const currentFactionHomeworld = createSelector(
  [currentSectorSelector, entitySelector, currentFaction],
  (sector, entities, faction = {}) => {
    const homeworld = entities[Entities.planet.key][faction.homeworld];
    if (!homeworld) {
      return undefined;
    }
    return {
      link: `/sector/${sector}/${Entities.planet.key}/${faction.homeworld}`,
      name: homeworld.name,
    };
  },
);

export const currentFactionAssets = createSelector(
  [currentSectorSelector, entitySelector, currentFaction],
  (sector, entities, faction = {}) =>
    map(faction.assets, ({ location, type, hitPoints }) => {
      const locationEntity = entities[Entities.planet.key][location];
      const { hp, ...asset } = FACTION_ASSETS[type];
      return {
        ...asset,
        hitPoints: {
          total: hp,
          current: hitPoints,
        },
        location: {
          link: `/sector/${sector}/${Entities.planet.key}/${location}`,
          name: locationEntity.name,
        },
      };
    }),
);

export const isValidFactionForm = createSelector(
  [factionFormSelector],
  ({ name }) => !!name && name.length <= LAYER_NAME_LENGTH,
);
