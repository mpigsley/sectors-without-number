import { doFacebookLogin } from 'store/api';

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';

export const LOGGED_IN = 'LOGGED_IN';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const openLoginModal = () => ({ type: OPEN_LOGIN_MODAL });
export const closeLoginModal = () => ({ type: CLOSE_LOGIN_MODAL });
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
