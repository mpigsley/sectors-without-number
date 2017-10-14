import { actions as ReduxToastrActions } from 'react-redux-toastr';
import {
  getCurrentUser,
  doFacebookLogin,
  doGoogleLogin,
  doSignup,
  doLogin,
  doPasswordReset,
  doLogout,
} from 'store/api';

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const SET_AUTH_USER = 'SET_AUTH_USER';
export const USER_FETCH_COMPLETE = 'USER_FETCH_COMPLETE';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const TOGGLE_USER_DROPDOWN = 'TOGGLE_USER_DROPDOWN';

export const openLoginModal = () => ({ type: OPEN_LOGIN_MODAL });
export const closeLoginModal = () => ({ type: CLOSE_LOGIN_MODAL });
export const setAuthUser = user => ({ type: SET_AUTH_USER, user });
export const toggleDropdown = () => ({ type: TOGGLE_USER_DROPDOWN });
export const updateLoginForm = (key, value) => ({
  type: UPDATE_LOGIN_FORM,
  key,
  value,
});

export function fetchUser() {
  return dispatch =>
    getCurrentUser().then(user => {
      if (user) {
        dispatch({ type: SET_AUTH_USER, user });
      } else {
        dispatch({ type: USER_FETCH_COMPLETE });
      }
    });
}

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

export function passwordReset() {
  return (dispatch, getState) => {
    const { user } = getState();
    return doPasswordReset(user.form.email)
      .then(() => {
        dispatch(closeLoginModal());
        dispatch(
          ReduxToastrActions.add({
            options: {
              removeOnHover: true,
              showCloseButton: true,
            },
            position: 'bottom-left',
            title: 'Password Reset Sent',
            message: 'You should be receiving an email soon.',
            type: 'success',
          }),
        );
      })
      .catch(error => {
        dispatch({ type: AUTH_FAILURE, error: error.message });
        console.error(error);
      });
  };
}

export function logout() {
  return dispatch =>
    doLogout().then(() => {
      dispatch({ type: LOGGED_OUT });
    });
}
