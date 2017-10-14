import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  UPDATE_LOGIN_FORM,
  LOGGED_IN,
  SET_AUTH_USER,
  USER_FETCH_COMPLETE,
  AUTH_FAILURE,
} from 'store/actions/user.actions';

const initialState = {
  isFetchingState: true,
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
    case SET_AUTH_USER:
      return {
        ...state,
        model: action.user,
        isModalOpen: false,
        isFetchingState: false,
      };
    case USER_FETCH_COMPLETE:
      return { ...state, isFetchingState: false };
    case AUTH_FAILURE:
      return {
        ...state,
        error: action.error || 'There has been an error. Please try again.',
      };
    default:
      return state;
  }
}
