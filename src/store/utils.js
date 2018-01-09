import { actions as ReduxToastrActions } from 'react-redux-toastr';

import { syncLockSelector } from 'store/selectors/base.selectors';

export const SuccessToast = ({
  title = 'Sector Saved',
  message = 'Your sector has been saved.',
} = {}) =>
  ReduxToastrActions.add({
    options: {
      removeOnHover: true,
      showCloseButton: true,
    },
    position: 'bottom-left',
    type: 'success',
    message,
    title,
  });

export const ErrorToast = () =>
  ReduxToastrActions.add({
    options: {
      removeOnHover: true,
      showCloseButton: true,
    },
    position: 'bottom-left',
    type: 'error',
    title: 'There has been an error',
    message: 'Report a problem if it persists.',
  });

export const syncLock = (action, parameters = {}) => (dispatch, getState) => {
  if (syncLockSelector(getState())) {
    return Promise.resolve();
  }
  return dispatch({ type: action, ...parameters });
};
