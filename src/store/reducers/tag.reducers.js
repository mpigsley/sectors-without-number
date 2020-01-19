import { FETCHED_SECTOR, INITIALIZED } from 'store/actions/combined.actions';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  ITEM_ADDED,
  ITEM_DELETED,
} from 'store/actions/tag.actions';
import { omit } from 'constants/lodash';

export const initialState = {
  models: {},
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
    case OPEN_MODAL:
      return { ...state, isOpen: true };
    case CLOSE_MODAL:
      return { ...state, isOpen: false };
    case ITEM_ADDED:
      return { ...state, models: { ...state.models, ...action.item } };
    case ITEM_DELETED:
      return { ...state, models: omit(state.models, action.item) };
    default:
      return state;
  }
}
