import Chance from 'chance';
import Firebase from 'firebase/app';

import { updateLayer as syncUpdateLayer } from 'store/api/layer';
import {
  layerFormSelector,
  currentSectorSelector,
  currentEntitySelector,
  layerRegionFormSelector,
  layerRegionPaintSelector,
} from 'store/selectors/base.selectors';
import { currentLayer } from 'store/selectors/layer.selectors';
import { addLayer } from 'store/actions/combined.actions';

import { createId } from 'utils/common';
import { SuccessToast, ErrorToast } from 'utils/toasts';
import {
  keys,
  includes,
  omit,
  pickBy,
  mapValues,
  zipObject,
} from 'constants/lodash';

const ACTION_PREFIX = '@@layer';
export const RESET_FORMS = `${ACTION_PREFIX}/RESET_FORMS`;
export const FORM_UPDATED = `${ACTION_PREFIX}/FORM_UPDATED`;
export const EDITED = `${ACTION_PREFIX}/EDITED`;
export const INITIALIZE_LAYER_EDIT = `${ACTION_PREFIX}/INITIALIZE_LAYER_EDIT`;
export const INITIALIZE_REGION_EDIT = `${ACTION_PREFIX}/INITIALIZE_REGION_EDIT`;
export const REGION_FORM_UPDATED = `${ACTION_PREFIX}/REGION_FORM_UPDATED`;
export const CANCEL_REGION_EDIT = `${ACTION_PREFIX}/CANCEL_REGION_EDIT`;
export const OPENED_COLOR_PICKER = `${ACTION_PREFIX}/OPENED_COLOR_PICKER`;
export const CLOSED_COLOR_PICKER = `${ACTION_PREFIX}/CLOSED_COLOR_PICKER`;
export const BEGAN_REGION_PAINT = `${ACTION_PREFIX}/BEGAN_REGION_PAINT`;
export const CLOSED_REGION_PAINT = `${ACTION_PREFIX}/CLOSED_REGION_PAINT`;

export const resetForms = () => ({ type: RESET_FORMS });
export const updateLayer = (key, value) => ({
  type: FORM_UPDATED,
  key,
  value,
});

export const submitForm = (intl) => (dispatch, getState) => {
  const state = getState();
  const update = layerFormSelector(state);
  const sectorId = currentSectorSelector(state);
  const layerId = currentEntitySelector(state);

  return !layerId
    ? dispatch(addLayer(update, intl))
    : syncUpdateLayer(sectorId, layerId, update)
        .then(({ layer }) => {
          dispatch(
            SuccessToast({
              title: intl.formatMessage({ id: 'misc.sectorSaved' }),
              message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
            }),
          );
          dispatch({ type: EDITED, sectorId, layerId, layer });
        })
        .catch((err) => {
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

export const initializeRegionForm = (regionId) => (dispatch, getState) => {
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

export const updateRegionForm = (update) => ({
  type: REGION_FORM_UPDATED,
  update,
});

export const cancelRegionForm = () => ({ type: CANCEL_REGION_EDIT });

export const submitRegionForm = (intl) => (dispatch, getState) => {
  const state = getState();
  const { regionId, ...regionForm } = layerRegionFormSelector(state);
  const sectorId = currentSectorSelector(state);
  const layerId = currentEntitySelector(state);
  return syncUpdateLayer(sectorId, layerId, {
    regions: {
      ...(currentLayer(state).regions || {}),
      [regionId || createId()]: {
        color: new Chance().color({ format: 'hex' }),
        ...regionForm,
      },
    },
  })
    .then(({ layer }) => {
      dispatch(
        SuccessToast({
          title: intl.formatMessage({ id: 'misc.sectorSaved' }),
          message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
        }),
      );
      dispatch({ type: EDITED, sectorId, layerId, layer });
    })
    .catch((err) => {
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
  const current = currentLayer(state);
  const layer = {
    regions: {
      ...current.regions,
      [regionId]: {
        ...current.regions[regionId],
        ...update,
      },
    },
  };
  dispatch({ type: EDITED, sectorId, layerId, layer });
  return syncUpdateLayer(sectorId, layerId, layer);
};

export const removeRegion = (regionId, intl) => (dispatch, getState) => {
  const state = getState();
  const layerId = currentEntitySelector(state);
  if (!regionId || !layerId) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  const current = currentLayer(state);
  const reducedHexes = mapValues(
    pickBy(current.hexes, ({ regions }) => includes(regions, regionId)),
    (hex) => ({
      ...hex,
      regions: hex.regions.filter((reg) => reg !== regionId),
    }),
  );
  const deletedHexIds = keys(
    pickBy(reducedHexes, ({ regions }) => !regions.length),
  );
  const updatedHexes = omit(
    { ...current.hexes, ...reducedHexes },
    ...deletedHexIds,
  );
  dispatch({
    type: EDITED,
    sectorId,
    layerId,
    layer: {
      regions: omit(current.regions, regionId),
      hexes: updatedHexes,
    },
  });
  return syncUpdateLayer(sectorId, layerId, {
    regions: { [regionId]: Firebase.firestore.FieldValue.delete() },
    hexes: {
      ...updatedHexes,
      ...zipObject(
        deletedHexIds,
        deletedHexIds.map(() => Firebase.firestore.FieldValue.delete()),
      ),
    },
  })
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
    .catch((err) => {
      console.error(err);
      return dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const openColorPicker = (regionId) => ({
  type: OPENED_COLOR_PICKER,
  regionId,
});

export const closeColorPicker = () => ({ type: CLOSED_COLOR_PICKER });

export const beginRegionPaint = (regionId) => ({
  type: BEGAN_REGION_PAINT,
  regionId,
});

export const closeRegionPaint = () => ({ type: CLOSED_REGION_PAINT });

export const toggleRegionAtHex = (hexId) => (dispatch, getState) => {
  const state = getState();
  const layerId = currentEntitySelector(state);
  const regionId = layerRegionPaintSelector(state);
  if (!hexId || !regionId || !layerId) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  const current = currentLayer(state);
  const existingHexRegions = ((current.hexes || {})[hexId] || {}).regions || [];
  const newRegions = includes(existingHexRegions, regionId)
    ? existingHexRegions.filter((reg) => reg !== regionId)
    : [...existingHexRegions, regionId];
  const commonAction = { type: EDITED, sectorId, layerId };
  if (!newRegions.length) {
    dispatch({
      ...commonAction,
      layer: {
        hexes: omit(current.hexes, hexId),
      },
    });
    return syncUpdateLayer(sectorId, layerId, {
      hexes: { [hexId]: Firebase.firestore.FieldValue.delete() },
    });
  }
  const layer = {
    hexes: { ...(current.hexes || {}), [hexId]: { regions: newRegions } },
  };
  dispatch({ ...commonAction, layer });
  return syncUpdateLayer(sectorId, layerId, layer);
};
