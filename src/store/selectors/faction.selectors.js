import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import { FACTION_ASSETS } from 'constants/faction';
import Entities from 'constants/entities';
import { sortBy, every, map } from 'constants/lodash';
import { factionHitPoints, factionIncomeAndOwnedAssets } from 'utils/faction';

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
    sortBy(
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

        const { income } = factionIncomeAndOwnedAssets(faction);
        const children = map(assets, (asset, assetId) => {
          const { category, hp } = FACTION_ASSETS[asset.type];
          const entity = entities[Entities.planet.key][asset.location];
          return {
            key: assetId,
            name: asset.type,
            stealthed: asset.stealthed,
            type: category,
            balance: asset.upkeep,
            hitPoints: `${asset.hitPoints || 0} / ${hp || '-'}`,
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
          type: `${force || 0} / ${cunning || 0} / ${wealth || 0}`,
          hitPoints: `${hitPoints || 0} / ${factionHitPoints(faction)}`,
          homeworld: entity
            ? {
                link: `/sector/${sector}/${Entities.planet.key}/${homeworld}`,
                name: entity.name,
              }
            : {},
          children: sortBy(children, 'name'),
        };
      }),
      'name',
    ),
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

    const { income, owned } = factionIncomeAndOwnedAssets(faction);
    return { hitPoints: factionHitPoints(faction), income, owned, homeworld };
  },
);

export const currentFactionAssets = createSelector(
  [currentSectorSelector, entitySelector, currentFaction],
  (sector, entities, faction = {}) =>
    map(faction.assets, ({ location, type, hitPoints, stealthed }, id) => {
      const locationEntity = entities[Entities.planet.key][location];
      const { hp, ...asset } = FACTION_ASSETS[type];
      return {
        ...asset,
        id,
        stealthed,
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
  ({ name, assets }) =>
    !!name &&
    name.length <= LAYER_NAME_LENGTH &&
    every(assets || [], ({ location }) => location),
);
