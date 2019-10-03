import Chance from 'chance';

import { FACTION_ASSETS, FACTION_ASSET_CATEGORIES } from 'constants/faction';
import { forEach, reduce } from 'constants/lodash';

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

export const factionHitPoints = faction =>
  4 +
  (RATING_TO_HP[faction[FACTION_ASSET_CATEGORIES.wealth]] || 0) +
  (RATING_TO_HP[faction[FACTION_ASSET_CATEGORIES.force]] || 0) +
  (RATING_TO_HP[faction[FACTION_ASSET_CATEGORIES.cunning]] || 0);

export const factionIncomeAndOwnedAssets = faction => {
  let income =
    Math.ceil(faction[FACTION_ASSET_CATEGORIES.wealth] / 2) +
    Math.floor(
      (faction[FACTION_ASSET_CATEGORIES.force] +
        faction[FACTION_ASSET_CATEGORIES.cunning]) /
        4,
    );

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

  forEach(owned, (num, type) => {
    if (num > faction[type]) {
      income -= num - faction[type];
    }
  });

  return { income, owned };
};

export const factionColor = (color, key) =>
  color || new Chance(key).color({ format: 'hex' });
