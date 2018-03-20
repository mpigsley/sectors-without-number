import { actions as ReduxToastrActions } from 'react-redux-toastr';

export const SuccessToast = ({ title = '', message = '', config } = {}) =>
  ReduxToastrActions.add({
    options: {
      removeOnHover: true,
      showCloseButton: true,
    },
    position: 'bottom-left',
    type: 'success',
    ...(config || {}),
    message,
    title,
  });

export const InfoToast = ({ title = '', message = '', config } = {}) =>
  ReduxToastrActions.add({
    options: {
      removeOnHover: true,
      showCloseButton: true,
    },
    position: 'bottom-left',
    type: 'info',
    ...(config || {}),
    message,
    title,
  });

export const WarningToast = ({ title = '', message = '', config } = {}) =>
  ReduxToastrActions.add({
    options: {
      removeOnHover: true,
      showCloseButton: true,
    },
    position: 'bottom-left',
    type: 'warning',
    ...(config || {}),
    message,
    title,
  });

export const ErrorToast = ({ title = '', message = '', config } = {}) =>
  ReduxToastrActions.add({
    options: {
      removeOnHover: true,
      showCloseButton: true,
    },
    position: 'bottom-left',
    type: 'error',
    ...(config || {}),
    title,
    message,
  });

export const removeToastById = ReduxToastrActions.remove;
