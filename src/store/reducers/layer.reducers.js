import { omit } from 'constants/lodash';

import { FETCHED_SECTOR, INITIALIZED } from 'store/actions/combined.actions';
import {
  RESET_FORMS,
  FORM_UPDATED,
  SUBMITTED,
  DELETED,
  INITIALIZE_LAYER_EDIT,
  INITIALIZE_REGION_EDIT,
  REGION_FORM_UPDATED,
  CANCEL_REGION_EDIT,
  SUBMITTED_REGION,
} from 'store/actions/layer.actions';

const initialForm = () => ({
  name: '',
  description: '',
  isHidden: false,
});

export const initialState = {
  models: {},
  form: initialForm(),
  regionEdit: null,
  isEditing: false,
};

export default function layer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
    case FETCHED_SECTOR:
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
    case RESET_FORMS:
      return {
        ...state,
        form: initialForm(),
      };
    case FORM_UPDATED:
      return {
        ...state,
        form: {
          ...state.form,
          [action.key]: action.value,
        },
      };
    case SUBMITTED:
      return {
        ...state,
        form: initialForm(),
        isEditing: false,
        models: {
          ...state.models,
          [action.sectorId]: {
            ...(state.models[action.sectorId] || {}),
            [action.key]: action.layer,
          },
        },
      };
    case DELETED:
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
      return { ...state, regionEdit: action.region };
    case REGION_FORM_UPDATED:
      return {
        ...state,
        regionEdit: { ...state.regionEdit, ...action.update },
      };
    case CANCEL_REGION_EDIT:
      return { ...state, regionEdit: null };
    case SUBMITTED_REGION:
      return {
        ...state,
        regionEdit: null,
        models: {
          ...state.models,
          [action.sectorId]: {
            ...state.models[action.sectorId],
            [action.layerId]: {
              ...state.models[action.sectorId][action.layerId],
              regions: {
                ...(state.models[action.sectorId][action.layerId].regions ||
                  {}),
                [action.key]: action.region,
              },
            },
          },
        },
      };
    default:
      return state;
  }
}
