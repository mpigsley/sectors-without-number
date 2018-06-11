import { FETCHED_SECTOR, INITIALIZED } from 'store/actions/combined.actions';
import {
  RESET_FORMS,
  UPDATED_LAYER,
  UPDATED_REGION,
} from 'store/actions/layer.actions';

const initialLayer = () => ({
  name: '',
  description: '',
  isHidden: false,
});

const initialRegion = () => ({
  name: '',
  description: '',
  color: '',
  isHidden: false,
});

export const initialState = {
  models: {},
  layerForm: initialLayer(),
  regionForm: initialRegion(),
};

export default function layer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
    case FETCHED_SECTOR:
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
        layerForm: initialLayer(),
        regionForm: initialRegion(),
      };
    case UPDATED_LAYER:
      return {
        ...state,
        layerForm: {
          ...state.layerForm,
          [action.key]: action.value,
        },
      };
    case UPDATED_REGION:
      return {
        ...state,
        regionForm: {
          ...state.regionForm,
          [action.key]: action.value,
        },
      };
    default:
      return state;
  }
}
