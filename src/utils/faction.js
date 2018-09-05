import { FACTION_ASSET_CATEGORIES } from 'constants/faction';

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

export const factionBaseIncome = faction =>
  Math.ceil(faction[FACTION_ASSET_CATEGORIES.wealth] / 2) +
  Math.floor(
    (faction[FACTION_ASSET_CATEGORIES.force] +
      faction[FACTION_ASSET_CATEGORIES.cunning]) /
      4,
  );
