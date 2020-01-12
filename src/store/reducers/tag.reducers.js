import { LOCATION_CHANGE } from 'connected-react-router';

import { FETCHED_SECTOR, INITIALIZED } from 'store/actions/combined.actions';
import {
  FORM_UPDATED,
  OPEN_MODAL,
  CLOSE_MODAL,
} from 'store/actions/tag.actions';

const initialForm = () => ({
  name: '',
  description: '',
  enemies: [],
  friends: [],
  complications: [],
  things: [],
});

export const initialState = {
  models: {},
  form: initialForm(),
  isOpen: false,
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
    case LOCATION_CHANGE:
      return { ...state, form: initialForm() };
    case OPEN_MODAL:
      return { ...state, isOpen: true, form: initialForm() };
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
