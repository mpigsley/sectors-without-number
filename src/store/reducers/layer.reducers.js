import { LOCATION_CHANGE } from 'connected-react-router';
import { omit } from 'constants/lodash';

import {
  FETCHED_SECTOR,
  INITIALIZED,
  CREATED_LAYER,
  DELETED_LAYER,
  EXPAND_SECTOR,
} from 'store/actions/combined.actions';
import {
  RESET_FORMS,
  FORM_UPDATED,
  EDITED,
  INITIALIZE_LAYER_EDIT,
  INITIALIZE_REGION_EDIT,
  REGION_FORM_UPDATED,
  CANCEL_REGION_EDIT,
  OPENED_COLOR_PICKER,
  CLOSED_COLOR_PICKER,
  BEGAN_REGION_PAINT,
  CLOSED_REGION_PAINT,
} from 'store/actions/layer.actions';

const initialForm = () => ({
  name: '',
  description: '',
  isHidden: false,
});

export const initialState = {
  models: {},
  form: initialForm(),
  regionForm: null,
  regionPaint: null,
  isEditing: false,
  colorPicker: null,
};

export default function layer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
    case FETCHED_SECTOR:
    case EXPAND_SECTOR:
      if (!action.sectorId) {
        return state;
      }
      return {
        ...state,
        models: {
          ...state.models,
          [action.sectorId]: action.layers,
        },
      };
    case LOCATION_CHANGE:
    case RESET_FORMS:
      return {
        ...state,
        regionPaint: null,
        colorPicker: null,
        isEditing: false,
        form: initialForm(),
        regionForm: null,
      };
    case FORM_UPDATED:
      return {
        ...state,
        form: {
          ...state.form,
          [action.key]: action.value,
        },
      };
    case EDITED:
    case CREATED_LAYER:
      return {
        ...state,
        form: initialForm(),
        isEditing: false,
        regionForm: null,
        models: {
          ...state.models,
          [action.sectorId]: {
            ...(state.models[action.sectorId] || {}),
            [action.layerId]: {
              ...((state.models[action.sectorId] || {})[action.layerId] || {}),
              ...action.layer,
            },
          },
        },
      };
    case DELETED_LAYER:
      return {
        ...state,
        models: {
          ...state.models,
          [action.sectorId]: omit(
            state.models[action.sectorId],
            action.layerId,
          ),
        },
      };
    case INITIALIZE_LAYER_EDIT:
      return {
        ...state,
        isEditing: true,
        form: action.layer,
      };
    case INITIALIZE_REGION_EDIT:
      return { ...state, regionForm: action.region };
    case REGION_FORM_UPDATED:
      return {
        ...state,
        regionForm: { ...state.regionForm, ...action.update },
      };
    case CANCEL_REGION_EDIT:
      return { ...state, regionForm: null };
    case OPENED_COLOR_PICKER:
      return { ...state, colorPicker: action.regionId };
    case CLOSED_COLOR_PICKER:
      return { ...state, colorPicker: null };
    case BEGAN_REGION_PAINT:
      return { ...state, regionPaint: action.regionId };
    case CLOSED_REGION_PAINT:
      return { ...state, regionPaint: null };
    default:
      return state;
  }
}
