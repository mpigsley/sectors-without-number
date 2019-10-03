import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import {
  intersection,
  keys,
  mapValues,
  sortBy,
  pick,
  pickBy,
  reduce,
  uniq,
} from 'constants/lodash';
import {
  currentEntitySelector,
  currentSectorSelector,
  layersSelector,
  layerFormSelector,
  layerRegionPaintSelector,
} from 'store/selectors/base.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import { getSectorLayers } from 'store/selectors/entity.selectors';
import { currentFactionLayer } from 'store/selectors/faction.selectors';

export const isValidLayerForm = createSelector(
  [layerFormSelector],
  ({ name }) => !!name && name.length <= LAYER_NAME_LENGTH,
);

export const currentSectorLayers = createSelector(
  [currentSectorSelector, layersSelector, isViewingSharedSector],
  (sector, layers, isShared) =>
    pickBy(
      (layers || {})[sector] || {},
      ({ isHidden }) => !isShared || !isHidden,
    ),
);

export const currentLayer = createSelector(
  [currentSectorLayers, currentEntitySelector],
  (layers, current) => (layers || {})[current],
);

export const activeLayers = createSelector(
  [currentSectorLayers, getSectorLayers],
  (layers, sectorLayerMap) => {
    const syncedLayers = pick(sectorLayerMap, keys(layers || {}));
    const activeLayerIds = reduce(
      syncedLayers,
      (active, layer, layerId) => (layer ? [...active, layerId] : active),
      [],
    );
    return activeLayerIds.map(id => (layers || {})[id]);
  },
);

export const currentPaintRegion = createSelector(
  [currentLayer, layerRegionPaintSelector],
  (layer, regionPaint) => ((layer || {}).regions || {})[regionPaint],
);

export const visibleLayers = createSelector(
  [currentLayer, activeLayers, isViewingSharedSector],
  (current, active, isShared) => {
    const layers = (current ? [current] : active) || [];
    return layers.map(layer => {
      const visibleRegions = pickBy(
        layer.regions || {},
        ({ isHidden }) => !isShared || !isHidden,
      );
      return {
        ...layer,
        regions: visibleRegions,
        hexes: mapValues(layer.hexes || {}, ({ regions }) => ({
          regions: intersection(regions, keys(visibleRegions)),
        })),
      };
    });
  },
);

export const visibleLayerHexes = createSelector(
  [visibleLayers],
  layers => {
    const visibleHexes = layers.reduce(
      (hexMapping, { hexes = {} } = {}) => ({
        ...hexMapping,
        ...mapValues(hexes, (hex, key) => [
          ...(hexMapping[key] || []),
          ...hex.regions,
        ]),
      }),
      {},
    );

    const visibleRegions = layers.reduce(
      (regionMapping, { regions = {}, name } = {}) => ({
        ...regionMapping,
        ...mapValues(regions, region => ({ ...region, layerName: name })),
      }),
      {},
    );

    return mapValues(visibleHexes, regions =>
      sortBy(
        regions.map(region => visibleRegions[region]).filter(r => r),
        ({ name }) => name.toLowerCase(),
      ),
    );
  },
);

/** Check this out */
export const visibleLayerHexColors = createSelector(
  [
    visibleLayerHexes,
    currentFactionLayer,
    getSectorLayers,
    isViewingSharedSector,
  ],
  (hexes, factionHexes, layerMap, isShared) => {
    const visibleHexes = mapValues(hexes, list =>
      list.map(({ color }) => color),
    );
    if (isShared || !layerMap.factions) {
      return visibleHexes;
    }
    return reduce(
      factionHexes,
      (obj, colors, hex) => ({
        ...obj,
        [hex]: [...(obj[hex] || []), ...colors],
      }),
      visibleHexes,
    );
  },
);

export const hexLayerNameMapping = createSelector(
  [visibleLayerHexes],
  hexes =>
    mapValues(hexes, list =>
      list.reduce(
        (layerMapping, { layerName, name }) => ({
          ...layerMapping,
          [layerName]: [...(layerMapping[layerName] || []), name],
        }),
        {},
      ),
    ),
);
