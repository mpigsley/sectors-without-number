import { doFacebookLogin, doGoogleLogin, doSignup, doLogin } from 'store/api';

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';

export const LOGGED_IN = 'LOGGED_IN';
export const SET_AUTH_USER = 'SET_AUTH_USER';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const openLoginModal = () => ({ type: OPEN_LOGIN_MODAL });
export const closeLoginModal = () => ({ type: CLOSE_LOGIN_MODAL });
export const setAuthUser = user => ({ type: SET_AUTH_USER, user });
export const updateLoginForm = (key, value) => ({
  type: UPDATE_LOGIN_FORM,
  key,
  value,
});

export function facebookLogin() {
  return dispatch =>
    doFacebookLogin()
      .then(result => {
        dispatch({ type: LOGGED_IN, user: result.user.toJSON() });
      })
      .catch(error => {
        dispatch({ type: AUTH_FAILURE });
        console.error(error);
      });
}

export function googleLogin() {
  return dispatch =>
    doGoogleLogin()
      .then(result => {
        dispatch({ type: LOGGED_IN, user: result.user.toJSON() });
      })
      .catch(error => {
        dispatch({ type: AUTH_FAILURE, error: error.message });
        console.error(error);
      });
}

export function signup() {
  return (dispatch, getState) => {
    const { user } = getState();
    const { email, password, confirm } = user.form;
    if (!email || !password || !confirm) {
      return dispatch({
        type: AUTH_FAILURE,
        error: 'Email and password are required.',
      });
    } else if (password !== confirm) {
      return dispatch({
        type: AUTH_FAILURE,
        error: 'Passwords do not match.',
      });
    }
    return doSignup(user.form.email, user.form.password)
      .then(result => {
        result.sendEmailVerification();
        dispatch({ type: LOGGED_IN, user: result.toJSON() });
      })
      .catch(error => {
        dispatch({ type: AUTH_FAILURE });
        console.error(error);
      });
  };
}

export function login() {
  return (dispatch, getState) => {
    const { user } = getState();
    const { email, password } = user.form;
    if (!email || !password) {
      return dispatch({
        type: AUTH_FAILURE,
        error: 'Email and password are required.',
      });
    }
    return doLogin(user.form.email, user.form.password)
      .then(result => {
        dispatch({ type: LOGGED_IN, user: result.toJSON() });
      })
      .catch(error => {
        dispatch({ type: AUTH_FAILURE, error: error.message });
        console.error(error);
      });
  };
}
