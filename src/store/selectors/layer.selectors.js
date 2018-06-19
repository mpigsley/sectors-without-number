import { createSelector } from 'reselect';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import { layerFormSelector } from 'store/selectors/base.selectors';

// eslint-disable-next-line
export const isValidLayerForm = createSelector(
  [layerFormSelector],
  ({ name }) => !!name && name.length <= LAYER_NAME_LENGTH,
);
