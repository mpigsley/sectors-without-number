import { push } from 'react-router-redux';

import { SuccessToast, ErrorToast } from 'utils/toasts';
import {
  createLayer,
  editLayer,
  deleteLayer,
  editRegion,
  createRegion,
} from 'store/api/layer';
import {
  layerFormSelector,
  currentSectorSelector,
  currentEntitySelector,
  layerRegionEditSelector,
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

export const updateRegion = update => ({ type: REGION_FORM_UPDATED, update });

export const cancelRegionEdit = () => ({ type: CANCEL_REGION_EDIT });

export const submitRegionEdit = intl => (dispatch, getState) => {
  const state = getState();
  const { regionId, ...regionEdit } = layerRegionEditSelector(state);
  const sectorId = currentSectorSelector(state);
  const layerId = currentEntitySelector(state);
  const promise = regionId
    ? editRegion(sectorId, layerId, regionId, regionEdit)
    : createRegion(sectorId, layerId, regionEdit);
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
