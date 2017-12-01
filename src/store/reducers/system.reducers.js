import {
  SYSTEM_HOLD,
  RELEASE_HOLD,
  SYSTEM_HOVER_START,
  SYSTEM_HOVER_END,
} from 'store/actions/system.actions';

const initialState = {
  hoverKey: null,
  holdKey: null,
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case SYSTEM_HOLD:
      return { ...state, holdKey: action.key };
    case RELEASE_HOLD:
      return { ...state, holdKey: null };
    case SYSTEM_HOVER_START:
      return { ...state, hoverKey: action.key };
    case SYSTEM_HOVER_END:
      return { ...state, hoverKey: null };
    default:
      return state;
  }
}
