import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  UPDATE_LOGIN_FORM,
  LOGGED_IN,
  AUTH_FAILURE,
} from 'store/actions/user.actions';

const initialState = {
  isModalOpen: false,
  error: null,
  model: null,
  form: {
    email: '',
    password: '',
    confirm: '',
  },
};

export default function sector(incomingState, action) {
  const state = { ...initialState, ...incomingState };
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return { ...state, isModalOpen: true };
    case CLOSE_LOGIN_MODAL:
      return { ...state, isModalOpen: false, error: null };
    case UPDATE_LOGIN_FORM:
      return {
        ...state,
        error: null,
        form: {
          ...state.form,
          [action.key]: action.value,
        },
      };
    case LOGGED_IN:
      return {
        ...state,
        model: action.user,
        isModalOpen: false,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        error: action.error || 'There has been an error. Please try again.',
      };
    default:
      return state;
  }
}
