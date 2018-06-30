import { push } from 'react-router-redux';
import Chance from 'chance';

import { SuccessToast, ErrorToast } from 'utils/toasts';
import { includes } from 'constants/lodash';
import {
  createLayer,
  editLayer,
  deleteLayer,
  editRegion,
  createRegion,
  deleteRegion,
  createOrUpdateHex,
  deleteHex,
} from 'store/api/layer';
import {
  layerFormSelector,
  currentSectorSelector,
  currentEntitySelector,
  layerRegionEditSelector,
  layerRegionPaintSelector,
} from 'store/selectors/base.selectors';
import { currentLayer } from 'store/selectors/layer.selectors';

const ACTION_PREFIX = '@@layer';
export const RESET_FORMS = `${ACTION_PREFIX}/RESET_FORMS`;
export const FORM_UPDATED = `${ACTION_PREFIX}/FORM_UPDATED`;
export const SUBMITTED = `${ACTION_PREFIX}/SUBMITTED`;
export const DELETED = `${ACTION_PREFIX}/DELETED`;
export const INITIALIZE_LAYER_EDIT = `${ACTION_PREFIX}/INITIALIZE_LAYER_EDIT`;
export const INITIALIZE_REGION_EDIT = `${ACTION_PREFIX}/INITIALIZE_REGION_EDIT`;
export const REGION_FORM_UPDATED = `${ACTION_PREFIX}/REGION_FORM_UPDATED`;
export const CANCEL_REGION_EDIT = `${ACTION_PREFIX}/CANCEL_REGION_EDIT`;
export const SUBMITTED_REGION = `${ACTION_PREFIX}/SUBMITTED_REGION`;
export const DELETED_REGION = `${ACTION_PREFIX}/DELETED_REGION`;
export const OPENED_COLOR_PICKER = `${ACTION_PREFIX}/OPENED_COLOR_PICKER`;
export const CLOSED_COLOR_PICKER = `${ACTION_PREFIX}/CLOSED_COLOR_PICKER`;
export const BEGAN_REGION_PAINT = `${ACTION_PREFIX}/BEGAN_REGION_PAINT`;
export const CLOSED_REGION_PAINT = `${ACTION_PREFIX}/CLOSED_REGION_PAINT`;
export const UPDATE_LAYER_HEX = `${ACTION_PREFIX}/UPDATE_LAYER_HEX`;

export const resetForms = () => ({ type: RESET_FORMS });
export const updateLayer = (key, value) => ({
  type: FORM_UPDATED,
  key,
  value,
});

export const submitForm = intl => (dispatch, getState) => {
  const state = getState();
  const update = layerFormSelector(state);
  const sectorId = currentSectorSelector(state);
  const layerId = currentEntitySelector(state);

  const promise = layerId
    ? editLayer(sectorId, layerId, update)
    : createLayer(sectorId, update);

  return promise
    .then(({ key, layer }) => {
      dispatch(
        SuccessToast({
          title: intl.formatMessage({ id: 'misc.sectorSaved' }),
          message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
        }),
      );
      dispatch({ type: SUBMITTED, sectorId, key, layer });
      dispatch(push(`/sector/${sectorId}/layer/${key}`));
    })
    .catch(err => {
      console.error(err);
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const removeLayer = intl => (dispatch, getState) => {
  const state = getState();
  const sectorId = currentSectorSelector(state);
  const layerId = currentEntitySelector(state);
  return deleteLayer(sectorId, layerId)
    .then(() => {
      dispatch(
        SuccessToast({
          title: intl.formatMessage({ id: 'misc.sectorSaved' }),
          message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
        }),
      );
      dispatch(push(`/sector/${sectorId}`));
      dispatch({ type: DELETED, sectorId, layerId });
    })
    .catch(err => {
      console.error(err);
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const initializeLayerEdit = () => (dispatch, getState) =>
  dispatch({ type: INITIALIZE_LAYER_EDIT, layer: currentLayer(getState()) });

export const initializeRegionEdit = regionId => (dispatch, getState) => {
  const layer = currentLayer(getState());
  let region = { name: '', isHidden: false };
  if (regionId) {
    const existingRegion = (layer.regions || {})[regionId];
    if (!existingRegion) {
      return;
    }
    region = { ...existingRegion, regionId };
  }
  dispatch({ type: INITIALIZE_REGION_EDIT, region });
};

export const updateRegionForm = update => ({
  type: REGION_FORM_UPDATED,
  update,
});

export const cancelRegionEdit = () => ({ type: CANCEL_REGION_EDIT });

export const submitRegionEdit = intl => (dispatch, getState) => {
  const state = getState();
  const { regionId, ...regionEdit } = layerRegionEditSelector(state);
  const sectorId = currentSectorSelector(state);
  const layerId = currentEntitySelector(state);
  const promise = regionId
    ? editRegion(sectorId, layerId, regionId, regionEdit)
    : createRegion(sectorId, layerId, {
        ...regionEdit,
        color: new Chance().color({ format: 'hex' }),
      });
  return promise
    .then(({ key, region }) => {
      dispatch(
        SuccessToast({
          title: intl.formatMessage({ id: 'misc.sectorSaved' }),
          message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
        }),
      );
      dispatch({ type: SUBMITTED_REGION, sectorId, layerId, key, region });
    })
    .catch(err => {
      console.error(err);
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const updateRegion = (regionId, update) => (dispatch, getState) => {
  const state = getState();
  const layerId = currentEntitySelector(state);
  if (!regionId || !layerId) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  const layer = currentLayer(state);
  dispatch({
    type: SUBMITTED_REGION,
    sectorId,
    layerId,
    key: regionId,
    region: { ...(layer.regions[regionId] || {}), ...update },
  });
  return editRegion(sectorId, layerId, regionId, update);
};

export const removeRegion = (regionId, intl) => (dispatch, getState) => {
  const state = getState();
  const layerId = currentEntitySelector(state);
  if (!regionId || !layerId) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  dispatch({ type: DELETED_REGION, sectorId, layerId, regionId });
  return deleteRegion(sectorId, layerId, regionId)
    .then(() =>
      dispatch(
        SuccessToast({
          title: intl.formatMessage(
            { id: 'misc.entityDeleted' },
            { entity: intl.formatMessage({ id: 'misc.region' }) },
          ),
          message: intl.formatMessage(
            { id: 'misc.successfullyRemoved' },
            { entity: intl.formatMessage({ id: 'misc.region' }) },
          ),
        }),
      ),
    )
    .catch(err => {
      console.error(err);
      return dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const openColorPicker = regionId => ({
  type: OPENED_COLOR_PICKER,
  regionId,
});

export const closeColorPicker = () => ({ type: CLOSED_COLOR_PICKER });

export const beginRegionPaint = regionId => ({
  type: BEGAN_REGION_PAINT,
  regionId,
});

export const closeRegionPaint = () => ({ type: CLOSED_REGION_PAINT });

export const toggleRegionAtHex = hexId => (dispatch, getState) => {
  const state = getState();
  const layerId = currentEntitySelector(state);
  const regionId = layerRegionPaintSelector(state);
  if (!hexId || !regionId || !layerId) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  const layer = currentLayer(state);
  const existingHexRegions = (layer.hexes[hexId] || {}).regions || [];
  const newRegions = includes(existingHexRegions, regionId)
    ? existingHexRegions.filter(reg => reg !== regionId)
    : [...existingHexRegions, regionId];
  dispatch({
    type: UPDATE_LAYER_HEX,
    sectorId,
    layerId,
    hexId,
    hex: newRegions.length ? { regions: newRegions } : undefined,
  });
  return newRegions.length
    ? createOrUpdateHex(sectorId, layerId, hexId, { regions: newRegions })
    : deleteHex(sectorId, layerId, hexId);
};
