import Chance from 'chance';

import {
  FACTION_ASSETS,
  FACTION_ASSET_CATEGORIES,
  FACTION_GOALS,
  FACTION_TAGS,
} from 'constants/faction';
import { forEach, mapValues, reduce } from 'constants/lodash';

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

const translateOrKey = (intl, id, key) =>
  intl.messages[id] ? intl.formatMessage({ id }) : key;

export const translateFactions = (factions, intl) =>
  mapValues(factions, faction => {
    const translated = { ...faction };

    if (faction.goal && FACTION_GOALS[faction.goal]) {
      const baseId = `faction.goal.${faction.goal}`;
      translated.goal = {
        name: translateOrKey(intl, baseId, faction.goal),
        description: translateOrKey(
          intl,
          `${baseId}.description`,
          faction.goal,
        ),
      };
    }

    if (faction.relationship) {
      translated.relationship = translateOrKey(
        intl,
        `faction.relationship.${faction.relationship}`,
        faction.relationship,
      );
    }

    if ((faction.tags || []).length) {
      translated.tags = faction.tags
        .map(tag => {
          if (!FACTION_TAGS[tag]) {
            return tag;
          }
          const baseId = `faction.tags.${tag}`;
          return {
            name: translateOrKey(intl, baseId, tag),
            description: translateOrKey(intl, `${baseId}.description`, tag),
            effect: translateOrKey(intl, `${baseId}.effect`, tag),
          };
        });
    }

    if (faction.assets) {
      translated.assets = mapValues(faction.assets, asset => {
        if (!asset || !FACTION_ASSETS[asset.type]) {
          return asset;
        }
        const baseId = `faction.assets.${asset.type}`;
        return {
          ...asset,
          type: {
            name: translateOrKey(intl, baseId, asset.type),
            description: translateOrKey(
              intl,
              `${baseId}.description`,
              asset.type,
            ),
          },
        };
      });
    }

    return translated;
  });
