import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import { FACTION_ASSET_CATEGORIES, FACTION_ASSETS } from 'constants/faction';
import Entities from 'constants/entities';
import { map, reduce } from 'constants/lodash';
import { factionHitPoints, factionBaseIncome } from 'utils/faction';

import {
  entitySelector,
  currentEntitySelector,
  currentSectorSelector,
  factionsSelector,
  factionFormSelector,
} from 'store/selectors/base.selectors';

export const currentFormHitPoints = createSelector(
  [factionFormSelector],
  factionHitPoints,
);

export const currentSectorFactions = createSelector(
  [currentSectorSelector, factionsSelector],
  (sector, layers) => (layers || {})[sector] || {},
);

export const currentSectorFactionTable = createSelector(
  [currentSectorFactions, entitySelector, currentSectorSelector],
  (factions, entities, sector) =>
    map(factions, (faction, factionId) => {
      const {
        force,
        cunning,
        wealth,
        hitPoints,
        homeworld,
        assets,
        ...rest
      } = faction;

      let income = factionBaseIncome(faction);
      const children = map(assets, (asset, assetId) => {
        const { category, hp, upkeep } = FACTION_ASSETS[asset.type];
        if (upkeep) {
          income -= upkeep;
        }
        const entity = entities[Entities.planet.key][asset.location];
        return {
          key: assetId,
          name: asset.type,
          type: category,
          balance: asset.upkeep,
          hitPoints: `${asset.hitPoints} / ${hp || '-'}`,
          homeworld: entity
            ? {
                link: `/sector/${sector}/${Entities.planet.key}/${
                  asset.location
                }`,
                name: entity.name,
              }
            : {},
        };
      });

      const entity = entities[Entities.planet.key][homeworld];
      return {
        ...rest,
        key: factionId,
        income,
        type: `${force} / ${cunning} / ${wealth}`,
        hitPoints: `${hitPoints} / ${factionHitPoints(faction)}`,
        homeworld: entity
          ? {
              link: `/sector/${sector}/${Entities.planet.key}/${homeworld}`,
              name: entity.name,
            }
          : {},
        children,
      };
    }),
);

export const currentFaction = createSelector(
  [currentSectorFactions, currentEntitySelector],
  (factions, current) => (factions || {})[current],
);

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

    let income = factionBaseIncome(faction);
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

    return { hitPoints: factionHitPoints(faction), income, owned, homeworld };
  },
);

export const currentFactionAssets = createSelector(
  [currentSectorSelector, entitySelector, currentFaction],
  (sector, entities, faction = {}) =>
    map(faction.assets, ({ location, type, hitPoints }, id) => {
      const locationEntity = entities[Entities.planet.key][location];
      const { hp, ...asset } = FACTION_ASSETS[type];
      return {
        ...asset,
        id,
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
