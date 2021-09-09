import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import { FACTION_ASSETS } from 'constants/faction';
import Entities from 'constants/entities';
import { sortBy, every, map, reduce, forEach, uniqBy } from 'constants/lodash';
import { findTopLevelEntity } from 'utils/entity';
import { coordinateKey } from 'utils/common';
import {
  factionHitPoints,
  factionIncomeAndOwnedAssets,
  factionColor,
} from 'utils/faction';

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
          homeworldEntity,
          assets,
          ...rest
        } = faction;

        const { income } = factionIncomeAndOwnedAssets(faction);
        const children = map(assets, (asset, assetId) => {
          const { category, hp } = FACTION_ASSETS[asset.type];
          const entityType = asset.locationEntity || Entities.planet.key;
          const entity = entities[entityType][asset.location];
          const parent = entity
            ? entities[entity.parentEntity][entity.parent]
            : undefined;
          return {
            key: assetId,
            name: asset.type,
            stealthed: asset.stealthed,
            type: category,
            balance: asset.upkeep,
            hitPoints: `${asset.hitPoints || 0} / ${hp || '-'}`,
            homeworld: entity
              ? {
                  link: `/sector/${sector}/${entityType}/${asset.location}`,
                  name: `${entity.name}${parent ? ` (${parent.name})` : ''}`,
                }
              : {},
          };
        });

        const entityType = homeworldEntity || Entities.planet.key;
        const entity = entities[entityType][homeworld];
        const parent = entity
          ? entities[entity.parentEntity][entity.parent]
          : undefined;
        return {
          ...rest,
          key: factionId,
          income,
          type: `${force || 0} / ${cunning || 0} / ${wealth || 0}`,
          hitPoints: `${hitPoints || 0} / ${factionHitPoints(faction)}`,
          homeworld: entity
            ? {
                link: `/sector/${sector}/${entityType}/${homeworld}`,
                name: `${entity.name}${parent ? ` (${parent.name})` : ''}`,
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
    const entityType = faction.homeworldEntity || Entities.planet.key;
    const entity = entities[entityType][faction.homeworld];
    const parent = entity
      ? entities[entity.parentEntity][entity.parent]
      : undefined;
    let homeworld = {};
    if (entity) {
      homeworld = {
        link: `/sector/${sector}/${entityType}/${faction.homeworld}`,
        name: `${entity.name}${parent ? ` (${parent.name})` : ''}`,
      };
    }

    const { income, owned } = factionIncomeAndOwnedAssets(faction);
    return { hitPoints: factionHitPoints(faction), income, owned, homeworld };
  },
);

export const currentFactionAssets = createSelector(
  [currentSectorSelector, entitySelector, currentFaction],
  (sector, entities, faction = {}) =>
    map(
      faction.assets,
      ({ location, locationEntity, type, hitPoints, stealthed }, id) => {
        const entityType = locationEntity || Entities.planet.key;
        const entity = entities[entityType][location];
        const parent = entity
          ? entities[entity.parentEntity][entity.parent]
          : undefined;
        const { hp, ...asset } = FACTION_ASSETS[type];
        return {
          ...asset,
          id,
          stealthed,
          hitPoints: {
            total: hp,
            current: hitPoints,
          },
          location: entity
            ? {
                link: `/sector/${sector}/${entityType}/${location}`,
                name: `${entity.name}${parent ? ` (${parent.name})` : ''}`,
              }
            : {},
        };
      },
    ),
);

export const isValidFactionForm = createSelector(
  [factionFormSelector],
  ({ name, assets }) =>
    !!name &&
    name.length <= LAYER_NAME_LENGTH &&
    every(assets || [], ({ location }) => location),
);

export const factionLayerHexes = createSelector(
  [currentSectorFactions, entitySelector],
  (factions, entities) =>
    reduce(
      factions,
      (layer, faction, key) => {
        const color = factionColor(faction.color, key);

        let newLayer = { ...layer };
        const buildObj = (obj, name, entity, entityType) => {
          if (!entity) {
            return obj;
          }
          const entityObj = entities[entityType || Entities.planet.key][entity];
          if (!entityObj) {
            return obj;
          }
          const { x, y } = findTopLevelEntity(entities, entityObj);
          const locKey = coordinateKey(x, y);
          return {
            ...obj,
            [locKey]: uniqBy(
              [
                ...(obj[locKey] || []),
                {
                  key: `${name}-${color}`,
                  layerName: 'Factions',
                  name,
                  color,
                },
              ],
              'key',
            ),
          };
        };

        newLayer = buildObj(
          newLayer,
          faction.name,
          faction.homeworld,
          faction.homeworldEntity,
        );
        forEach(faction.assets, (asset) => {
          newLayer = buildObj(
            newLayer,
            faction.name,
            asset.location,
            asset.locationEntity,
          );
        });

        return newLayer;
      },
      {},
    ),
);
