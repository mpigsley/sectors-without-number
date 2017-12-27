import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { keys, values, zipObject } from 'lodash';
import { push } from 'react-router-redux';

import {
  updateCurrentUser,
  doFacebookLogin,
  doGoogleLogin,
  doSignup,
  doLogin,
  doPasswordReset,
  doLogout,
  uploadSector,
  getSyncedSectors,
} from 'store/api/firebase';
import { clearLocalDatabase } from 'store/api/local';
import Entities from 'constants/entities';
import { ErrorToast } from 'store/utils';

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const OPEN_EDIT_MODAL = 'OPEN_EDIT_MODAL';
export const CLOSE_EDIT_MODAL = 'CLOSE_EDIT_MODAL';
export const OPEN_USER_DROPDOWN = 'OPEN_USER_DROPDOWN';
export const CLOSE_USER_DROPDOWN = 'CLOSE_USER_DROPDOWN';
export const CLOSE_SYNC_MODAL = 'CLOSE_SYNC_MODAL';

export const UPDATE_USER_FORM = 'UPDATE_USER_FORM';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const INITIALIZE = 'INITIALIZE';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const openEditModal = () => ({ type: OPEN_EDIT_MODAL });
export const closeEditModal = () => ({ type: CLOSE_EDIT_MODAL });
export const openLoginModal = () => ({ type: OPEN_LOGIN_MODAL });
export const closeLoginModal = () => ({ type: CLOSE_LOGIN_MODAL });
export const openUserDropdown = () => ({ type: OPEN_USER_DROPDOWN });
export const closeUserDropdown = () => ({ type: CLOSE_USER_DROPDOWN });
export const closeSyncModal = () => ({ type: CLOSE_SYNC_MODAL });
export const updateUserForm = (key, value) => ({
  type: UPDATE_USER_FORM,
  key,
  value,
});

const syncLocalSectors = (sectors, creator) =>
  Promise.all([
    ...sectors.map(sector => uploadSector(sector, creator)),
    clearLocalDatabase(),
  ]).then(uploaded => {
    uploaded.splice(-1, 1); // Remove `clearLocalDatabase`
    return zipObject(uploaded.map(sector => sector.key), uploaded);
  });

const onLogin = (dispatch, local) => result =>
  getSyncedSectors(result.user ? result.user.uid : result.uid)
    .then(synced => {
      const filteredLocal = values(local).filter(
        ({ isCloudSave }) => !isCloudSave,
      );
      if (!filteredLocal.length) {
        return { sectors: synced, didSyncLocal: false };
      }
      return syncLocalSectors(
        filteredLocal,
        result.user ? result.user.uid : result.uid,
      ).then(uploaded => ({
        didSyncLocal: true,
        sectors: {
          ...synced,
          ...uploaded,
        },
      }));
    })
    .then(({ sectors, didSyncLocal }) => {
      dispatch(push('/'));
      dispatch({
        type: LOGGED_IN,
        user: result.user ? result.user.toJSON() : result.toJSON(),
        didSyncLocal,
        sectors,
      });
      return result;
    })
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });

export const initialize = ({
  local,
  user,
  synced = {},
  // currentSector,
}) => dispatch => {
  // Sync local sectors if user exists
  // Combine local and saved entities
  // Set current sector if viewing another user's sector
  dispatch({
    type: INITIALIZE,
    user,
    entities: local,
    saved: [
      ...keys(synced[Entities.sector.key]),
      ...keys(local[Entities.sector.key]),
    ],
  });
};

export const facebookLogin = () => (dispatch, getState) =>
  doFacebookLogin()
    .then(onLogin(dispatch, getState().sector.saved))
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });

export const googleLogin = () => (dispatch, getState) =>
  doGoogleLogin()
    .then(onLogin(dispatch, getState().sector.saved))
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });

export const signup = () => (dispatch, getState) => {
  const state = getState();
  const { email, password, confirm } = state.user.form;
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
  return doSignup(state.user.form.email, state.user.form.password)
    .then(onLogin(dispatch, state.sector.saved))
    .then(result => result.sendEmailVerification())
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });
};

export const login = () => (dispatch, getState) => {
  const state = getState();
  const { email, password } = state.user.form;
  if (!email || !password) {
    return dispatch({
      type: AUTH_FAILURE,
      error: 'Email and password are required.',
    });
  }
  return doLogin(state.user.form.email, state.user.form.password)
    .then(onLogin(dispatch, state.sector.saved))
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
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

export const updateUser = () => (dispatch, getState) => {
  const state = getState();
  return updateCurrentUser({ displayName: state.user.form.displayName })
    .then(() => {
      dispatch({
        type: UPDATE_USER,
        user: { displayName: state.user.form.displayName },
      });
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
};

export const logout = () => dispatch =>
  doLogout()
    .then(() => {
      dispatch(push('/'));
      dispatch({ type: LOGGED_OUT });
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
