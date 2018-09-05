import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import { FACTION_ASSET_CATEGORIES, FACTION_ASSETS } from 'constants/faction';
import Entities from 'constants/entities';
import { map, reduce } from 'constants/lodash';

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

const RATING_TO_HP = {
  1: 1,
  2: 2,
  3: 4,
  4: 6,
  5: 9,
  6: 12,
  7: 16,
  8: 20,
};

export const currentFactionAttributes = createSelector(
  [currentSectorSelector, entitySelector, currentFaction],
  (sector, entities, faction = {}) => {
    const entity = entities[Entities.planet.key][faction.homeworld];
    let homeworld = {};
    if (entity) {
      homeworld = {
        link: `/sector/${sector}/${Entities.planet.key}/${faction.homeworld}`,
        name: entity.name,
      };
    }

    let income =
      Math.ceil(faction[FACTION_ASSET_CATEGORIES.wealth] / 2) +
      Math.floor(
        (faction[FACTION_ASSET_CATEGORIES.force] +
          faction[FACTION_ASSET_CATEGORIES.cunning]) /
          4,
      );

    const hitPoints =
      4 +
      RATING_TO_HP[faction[FACTION_ASSET_CATEGORIES.wealth]] +
      RATING_TO_HP[faction[FACTION_ASSET_CATEGORIES.force]] +
      RATING_TO_HP[faction[FACTION_ASSET_CATEGORIES.cunning]];

    const owned = reduce(
      faction.assets,
      (obj, { type }) => {
        const { category, upkeep } = FACTION_ASSETS[type];
        if (upkeep) {
          income -= upkeep;
        }
        switch (category) {
          case FACTION_ASSET_CATEGORIES.force:
            return { ...obj, force: obj.force + 1 };
          case FACTION_ASSET_CATEGORIES.cunning:
            return { ...obj, cunning: obj.cunning + 1 };
          case FACTION_ASSET_CATEGORIES.wealth:
            return { ...obj, wealth: obj.wealth + 1 };
          default:
            return obj;
        }
      },
      { force: 0, cunning: 0, wealth: 0 },
    );

    return { hitPoints, income, owned, homeworld };
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
