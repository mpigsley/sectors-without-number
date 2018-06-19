import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import {
  currentSectorSelector,
  layersSelector,
  layerFormSelector,
} from 'store/selectors/base.selectors';

export const isValidLayerForm = createSelector(
  [layerFormSelector],
  ({ name }) => !!name && name.length <= LAYER_NAME_LENGTH,
);

export const currentSectorLayers = createSelector(
  [currentSectorSelector, layersSelector],
  (sector, layers) => (layers || {})[sector] || {},
);
