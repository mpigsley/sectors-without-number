import { FETCHED_SECTOR, INITIALIZED } from 'store/actions/combined.actions';
import {
  FORM_UPDATED,
  OPEN_MODAL,
  CLOSE_MODAL,
} from 'store/actions/tag.actions';

export const initialState = {
  models: {},
  isOpen: true,
};

export default function tag(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
    case FETCHED_SECTOR:
      return {
        ...state,
        models: {
          ...state.models,
          ...(action.tags || {}),
        },
      };
    case OPEN_MODAL:
      return { ...state, isOpen: true };
    case CLOSE_MODAL:
      return { ...state, isOpen: false };
    case FORM_UPDATED:
      return {
        ...state,
        form: {
          ...state.form,
          [action.key]: action.value,
        },
      };
    default:
      return state;
  }
}
