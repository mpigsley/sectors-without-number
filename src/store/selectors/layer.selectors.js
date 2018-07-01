import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import { zipObject, keys, map, sortBy, pick, reduce } from 'constants/lodash';
import {
  currentEntitySelector,
  currentSectorSelector,
  layersSelector,
  layerFormSelector,
  layerRegionPaintSelector,
} from 'store/selectors/base.selectors';
import { getSectorLayers } from 'store/selectors/entity.selectors';

export const isValidLayerForm = createSelector(
  [layerFormSelector],
  ({ name }) => !!name && name.length <= LAYER_NAME_LENGTH,
);

export const currentSectorLayers = createSelector(
  [currentSectorSelector, layersSelector],
  (sector, layers) => (layers || {})[sector] || {},
);

export const currentLayer = createSelector(
  [currentSectorLayers, currentEntitySelector],
  (layers, current) => (layers || {})[current],
);

export const activeLayer = createSelector(
  [currentSectorLayers, getSectorLayers],
  (layers, sectorLayerMap) => {
    const syncedLayers = pick(sectorLayerMap, keys(layers || {}));
    const activeLayerId = reduce(
      syncedLayers,
      (active, layer, layerId) => (layer ? layerId : active),
      undefined,
    );
    return (layers || {})[activeLayerId];
  },
);

export const currentPaintRegion = createSelector(
  [currentLayer, layerRegionPaintSelector],
  (layer, regionPaint) => ((layer || {}).regions || {})[regionPaint],
);

export const currentLayerHexes = createSelector(
  [currentLayer, activeLayer],
  (current, active) => {
    const layer = current || active;
    const regionMap = (layer || {}).regions || {};
    const hexMap = (layer || {}).hexes || {};
    return zipObject(
      keys(hexMap),
      map(hexMap, ({ regions }) =>
        sortBy(regions.map(regionId => regionMap[regionId]).filter(r => r), [
          ({ name }) => name.toLowerCase(),
        ]).map(({ color }) => color),
      ),
    );
  },
);
