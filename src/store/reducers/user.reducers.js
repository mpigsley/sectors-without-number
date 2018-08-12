import {
  OPENED_LOGIN_MODAL,
  CLOSED_LOGIN_MODAL,
  OPENED_EDIT_MODAL,
  CLOSED_EDIT_MODAL,
  UPDATED_USER_FORM,
  UPDATED_USER,
  LOGGED_IN,
  LOGGED_OUT,
  AUTH_FAILURE,
} from 'store/actions/user.actions';
import { INITIALIZED } from 'store/actions/combined.actions';
import englishLocale from 'lang/en';

const initialForm = () => ({
  email: '',
  password: '',
  confirm: '',
  displayName: '',
  locale: '',
});
export const initialState = {
  isInitialized: false,
  isLoginModalOpen: false,
  isEditModalOpen: false,
  error: null,
  model: null,
  form: initialForm(),
  locale: englishLocale,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
      return {
        ...state,
        model: action.user,
        isLoginModalOpen: false,
        isInitialized: true,
        locale: { ...englishLocale, ...action.locale },
        form: {
          ...state.form,
          displayName: (action.user || {}).displayName || '',
          locale: (action.user || {}).locale || 'en',
        },
      };
    case OPENED_LOGIN_MODAL:
      return { ...state, isLoginModalOpen: true };
    case CLOSED_LOGIN_MODAL:
      return { ...state, isLoginModalOpen: false, error: null };
    case OPENED_EDIT_MODAL:
      return { ...state, isEditModalOpen: true };
    case CLOSED_EDIT_MODAL:
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
    case UPDATED_USER:
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
