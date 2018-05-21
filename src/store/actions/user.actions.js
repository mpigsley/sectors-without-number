import keys from 'lodash/keys';
import pick from 'lodash/pick';
import { push } from 'react-router-redux';
import { addLocaleData } from 'react-intl';

import {
  savedSectorSelector,
  userFormSelector,
  userUidSelector,
  userModelLocaleSelector,
} from 'store/selectors/base.selectors';
import { getSavedEntities } from 'store/selectors/entity.selectors';

import {
  updateCurrentUser,
  getUserData,
  doFacebookLogin,
  doGoogleLogin,
  doSignup,
  doLogin,
  doPasswordReset,
  doLogout,
  getCurrentUser,
} from 'store/api/user';
import {
  getSectorEntities,
  getSyncedSectors,
  uploadEntities,
} from 'store/api/entity';
import { getNavigationData } from 'store/api/navigation';

import Locale from 'constants/locale';
import Entities from 'constants/entities';
import { SuccessToast, ErrorToast } from 'utils/toasts';
import { mergeEntityUpdates } from 'utils/entity';

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const OPEN_EDIT_MODAL = 'OPEN_EDIT_MODAL';
export const CLOSE_EDIT_MODAL = 'CLOSE_EDIT_MODAL';
export const OPEN_USER_DROPDOWN = 'OPEN_USER_DROPDOWN';
export const CLOSE_USER_DROPDOWN = 'CLOSE_USER_DROPDOWN';
export const CLOSE_SYNC_MODAL = 'CLOSE_SYNC_MODAL';

export const UPDATED_USER_FORM = 'UPDATED_USER_FORM';
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
  type: UPDATED_USER_FORM,
  key,
  value,
});

const onLogin = (dispatch, state) => result => {
  const localSync = !!savedSectorSelector(state).length;
  const uid = result.user ? result.user.uid : result.uid;
  let promise = Promise.resolve();
  if (localSync) {
    promise = uploadEntities(getSavedEntities(state));
  }
  return promise
    .then(() => Promise.all([getSyncedSectors(uid), getUserData(uid)]))
    .then(([sectors, userData]) => {
      dispatch(push('/'));
      dispatch({
        type: LOGGED_IN,
        user: {
          ...(result.user ? result.user.toJSON() : result.toJSON()),
          ...userData,
        },
        didSyncLocal: localSync,
        sectors,
      });
      return result;
    })
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });
};

export const initialize = location => dispatch =>
  getCurrentUser().then(user => {
    const { uid, locale } = user || {};
    const sectorId = location.pathname.split('/')[2];
    const isGameView =
      location.pathname.startsWith('/sector') ||
      location.pathname.startsWith('/overview');
    const promises = [
      isGameView ? getSectorEntities(sectorId, uid) : Promise.resolve({}),
      isGameView ? getNavigationData(sectorId) : Promise.resolve({}),
      uid ? getSyncedSectors(uid) : Promise.resolve(),
    ];
    if (locale && locale !== 'en' && Locale[locale]) {
      promises.push(
        Locale[locale].localeFetch().then(([userLocale, localeData]) => {
          addLocaleData(localeData);
          return userLocale;
        }),
      );
    }
    return Promise.all(promises).then(
      ([current, routes, sectors, userLocale]) =>
        dispatch({
          type: INITIALIZE,
          user,
          entities: mergeEntityUpdates(
            { [Entities.sector.key]: sectors },
            current.entities || {},
          ),
          routes,
          sectorId: current.sectorId,
          share: current.share,
          saved: keys(sectors || {}),
          locale: userLocale,
        }),
    );
  });

export const facebookLogin = () => (dispatch, getState) =>
  doFacebookLogin()
    .then(onLogin(dispatch, getState()))
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });

export const googleLogin = () => (dispatch, getState) =>
  doGoogleLogin()
    .then(onLogin(dispatch, getState()))
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });

export const signup = intl => (dispatch, getState) => {
  const state = getState();
  const { email, password, confirm } = userFormSelector(state);
  if (!email || !password || !confirm) {
    return dispatch({
      type: AUTH_FAILURE,
      error: intl.formatMessage({ id: 'misc.emailPassword' }),
    });
  } else if (password !== confirm) {
    return dispatch({
      type: AUTH_FAILURE,
      error: intl.formatMessage({ id: 'misc.noPasswordMatch' }),
    });
  }
  return doSignup(email, password)
    .then(onLogin(dispatch, state))
    .then(result => result.sendEmailVerification())
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });
};

export const login = intl => (dispatch, getState) => {
  const state = getState();
  const { email, password } = userFormSelector(state);
  if (!email || !password) {
    return dispatch({
      type: AUTH_FAILURE,
      error: intl.formatMessage({ id: 'misc.emailPassword' }),
    });
  }
  return doLogin(email, password)
    .then(onLogin(dispatch, state))
    .catch(error => {
      dispatch({ type: AUTH_FAILURE });
      console.error(error);
    });
};

export const passwordReset = intl => (dispatch, getState) => {
  const state = getState();
  const { email } = userFormSelector(state);
  return doPasswordReset(email)
    .then(() => {
      dispatch(closeLoginModal());
      dispatch(
        SuccessToast({
          title: intl.formatMessage({ id: 'misc.passwordResetSent' }),
          message: intl.formatMessage({ id: 'misc.receiveEmail' }),
        }),
      );
    })
    .catch(error => {
      dispatch({ type: AUTH_FAILURE, error: error.message });
      console.error(error);
    });
};

export const updateUser = intl => (dispatch, getState) => {
  const state = getState();
  const uid = userUidSelector(state);
  let filteredForm = pick(userFormSelector(state), 'displayName', 'locale');
  if (!Locale[filteredForm.local || 'en']) {
    filteredForm = { ...filteredForm, locale: 'en' };
  }
  return updateCurrentUser(uid, { ...filteredForm })
    .then(() => {
      if (userModelLocaleSelector(state) !== (filteredForm.locale || 'en')) {
        window.location.reload();
      } else {
        dispatch({
          type: UPDATE_USER,
          user: filteredForm,
        });
      }
    })
    .catch(err => {
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
      console.error(err);
    });
};

export const logout = intl => dispatch =>
  doLogout()
    .then(() => {
      dispatch(push('/'));
      dispatch({ type: LOGGED_OUT });
    })
    .catch(err => {
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
      console.error(err);
    });
