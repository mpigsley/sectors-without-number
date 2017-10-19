import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { values, keys } from 'lodash';

import {
  getCurrentUser,
  updateCurrentUser,
  doFacebookLogin,
  doGoogleLogin,
  doSignup,
  doLogin,
  doPasswordReset,
  doLogout,
  uploadSector,
} from 'store/api/firebase';
import { clearLocalDatabase } from 'store/api/local';

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const OPEN_EDIT_MODAL = 'OPEN_EDIT_MODAL';
export const CLOSE_EDIT_MODAL = 'CLOSE_EDIT_MODAL';
export const OPEN_USER_DROPDOWN = 'OPEN_USER_DROPDOWN';
export const CLOSE_USER_DROPDOWN = 'CLOSE_USER_DROPDOWN';

export const UPDATE_USER_FORM = 'UPDATE_USER_FORM';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const SET_AUTH_USER = 'SET_AUTH_USER';
export const USER_FETCH_COMPLETE = 'USER_FETCH_COMPLETE';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const openEditModal = () => ({ type: OPEN_EDIT_MODAL });
export const closeEditModal = () => ({ type: CLOSE_EDIT_MODAL });
export const openLoginModal = () => ({ type: OPEN_LOGIN_MODAL });
export const closeLoginModal = () => ({ type: CLOSE_LOGIN_MODAL });
export const setAuthUser = user => ({ type: SET_AUTH_USER, user });
export const openUserDropdown = () => ({ type: OPEN_USER_DROPDOWN });
export const closeUserDropdown = () => ({ type: CLOSE_USER_DROPDOWN });
export const updateUserForm = (key, value) => ({
  type: UPDATE_USER_FORM,
  key,
  value,
});

export const syncLocalSectors = () => (dispatch, getState) => {
  const { sector } = getState();
  return Promise.all([
    ...values(sector.saved).map(uploadSector),
    clearLocalDatabase(),
  ]).then(uploaded => {
    uploaded.splice(-1, 1);
    // TODO: Dispatch action
    console.log({
      remove: keys(sector.saved),
      add: uploaded,
    });
  });
};

export const fetchUser = () => dispatch =>
  getCurrentUser().then(user => {
    if (user) {
      dispatch({ type: SET_AUTH_USER, user });
    } else {
      dispatch({ type: USER_FETCH_COMPLETE });
    }
  });

export const updateUser = () => (dispatch, getState) => {
  const state = getState();
  return updateCurrentUser({ displayName: state.user.form.displayName })
    .then(() => {
      dispatch({
        type: UPDATE_USER,
        user: { displayName: state.user.form.displayName },
      });
    })
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });
};

export const facebookLogin = () => dispatch => {
  doFacebookLogin()
    .then(result => dispatch(syncLocalSectors()).then(() => result.user))
    .then(user => dispatch({ type: LOGGED_IN, user: user.toJSON() }))
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });
};

export const googleLogin = () => dispatch =>
  doGoogleLogin()
    .then(result => dispatch(syncLocalSectors()).then(() => result.user))
    .then(user => dispatch({ type: LOGGED_IN, user: user.toJSON() }))
    .catch(error => {
      dispatch({ type: AUTH_FAILURE, error: error.message });
      console.error(error);
    });

export const signup = () => (dispatch, getState) => {
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
    .then(result => dispatch(syncLocalSectors()).then(() => result))
    .then(result => {
      result.sendEmailVerification();
      dispatch({ type: LOGGED_IN, user: result.toJSON() });
    })
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });
};

export const login = () => (dispatch, getState) => {
  const { user } = getState();
  const { email, password } = user.form;
  if (!email || !password) {
    return dispatch({
      type: AUTH_FAILURE,
      error: 'Email and password are required.',
    });
  }
  return doLogin(user.form.email, user.form.password)
    .then(result => dispatch(syncLocalSectors()).then(() => result))
    .then(result => dispatch({ type: LOGGED_IN, user: result.toJSON() }))
    .catch(error => {
      dispatch({ type: AUTH_FAILURE, error: error.message });
      console.error(error);
    });
};

export const passwordReset = () => (dispatch, getState) => {
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

export const logout = () => dispatch =>
  doLogout().then(() => {
    dispatch({ type: LOGGED_OUT });
  });
