import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_EDIT_MODAL,
  CLOSE_EDIT_MODAL,
  UPDATED_USER_FORM,
  UPDATE_USER,
  LOGGED_IN,
  LOGGED_OUT,
  INITIALIZE,
  AUTH_FAILURE,
  OPEN_USER_DROPDOWN,
  CLOSE_USER_DROPDOWN,
  CLOSE_SYNC_MODAL,
} from 'store/actions/user.actions';

const initialForm = () => ({
  email: '',
  password: '',
  confirm: '',
  displayName: '',
  locale: '',
});
export const initialState = {
  isInitialized: false,
  isDropdownActive: false,
  isLoginModalOpen: false,
  isSyncModalOpen: false,
  isEditModalOpen: false,
  error: null,
  model: null,
  form: initialForm(),
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        model: action.user,
        isLoginModalOpen: false,
        isInitialized: true,
        form: {
          ...state.form,
          displayName: (action.user || {}).displayName || '',
          locale: (action.user || {}).locale || 'en',
        },
      };
    case OPEN_LOGIN_MODAL:
      return { ...state, isLoginModalOpen: true };
    case CLOSE_LOGIN_MODAL:
      return { ...state, isLoginModalOpen: false, error: null };
    case OPEN_EDIT_MODAL:
      return { ...state, isEditModalOpen: true, isDropdownActive: false };
    case CLOSE_EDIT_MODAL:
      return { ...state, isEditModalOpen: false, error: null };
    case UPDATED_USER_FORM:
      return {
        ...state,
        error: null,
        form: {
          ...state.form,
          [action.key]: action.value,
        },
      };
    case UPDATE_USER:
      return {
        ...state,
        isEditModalOpen: false,
        model: {
          ...state.model,
          ...action.user,
        },
      };
    case LOGGED_IN:
      return {
        ...state,
        model: action.user,
        isLoginModalOpen: false,
        isSyncModalOpen: action.didSyncLocal,
        form: {
          ...state.form,
          displayName: (action.user || {}).displayName || '',
          locale: (action.user || {}).locale || 'en',
        },
      };
    case LOGGED_OUT:
      return {
        ...state,
        model: null,
        form: initialForm(),
        isLoginModalOpen: false,
        isDropdownActive: false,
      };
    case CLOSE_SYNC_MODAL:
      return { ...state, isSyncModalOpen: false };
    case OPEN_USER_DROPDOWN:
      return { ...state, isDropdownActive: true };
    case CLOSE_USER_DROPDOWN:
      return { ...state, isDropdownActive: false };
    case AUTH_FAILURE:
      return {
        ...state,
        error: action.error || 'There has been an error. Please try again.',
      };
    default:
      return state;
  }
}
