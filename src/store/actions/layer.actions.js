import { push } from 'react-router-redux';

import { SuccessToast, ErrorToast } from 'utils/toasts';
import { createLayer, editLayer, deleteLayer } from 'store/api/layer';
import {
  layerFormSelector,
  currentSectorSelector,
  currentEntitySelector,
} from 'store/selectors/base.selectors';
import { currentLayer } from 'store/selectors/layer.selectors';

const ACTION_PREFIX = '@@layer';
export const RESET_FORMS = `${ACTION_PREFIX}/RESET_FORMS`;
export const FORM_UPDATED = `${ACTION_PREFIX}/FORM_UPDATED`;
export const SUBMITTED = `${ACTION_PREFIX}/SUBMITTED`;
export const DELETED = `${ACTION_PREFIX}/DELETED`;
export const INITIALIZE_EDIT = `${ACTION_PREFIX}/INITIALIZE_EDIT`;

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
  dispatch({ type: INITIALIZE_EDIT, layer: currentLayer(getState()) });
