import { push } from 'react-router-redux';

import { SuccessToast, ErrorToast } from 'utils/toasts';
import { createLayer } from 'store/api/layer';
import {
  layerFormSelector,
  currentSectorSelector,
} from 'store/selectors/base.selectors';

const ACTION_PREFIX = '@@navigation';
export const RESET_FORMS = `${ACTION_PREFIX}/RESET_FORMS`;
export const UPDATED_LAYER = `${ACTION_PREFIX}/UPDATED_LAYER`;
export const UPDATED_REGION = `${ACTION_PREFIX}/UPDATED_REGION`;
export const CREATED_LAYER = `${ACTION_PREFIX}/CREATED_LAYER`;

export const resetForms = () => ({ type: RESET_FORMS });
export const updateLayer = (key, value) => ({
  type: UPDATED_LAYER,
  key,
  value,
});
export const updateRegion = (key, value) => ({
  type: UPDATED_REGION,
  key,
  value,
});

export const addLayer = intl => (dispatch, getState) => {
  const state = getState();
  const update = layerFormSelector(state);

  const sectorId = currentSectorSelector(state);
  console.log(sectorId, update);
  return createLayer(sectorId, update)
    .then(({ key, layer }) => {
      dispatch(
        SuccessToast({
          title: intl.formatMessage({ id: 'misc.sectorSaved' }),
          message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
        }),
      );
      dispatch(push(`/sector/${sectorId}/layer/${key}`));
      dispatch({ type: CREATED_LAYER, sectorId, key, layer });
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
