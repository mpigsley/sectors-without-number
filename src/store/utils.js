import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { includes } from 'lodash';

import {
  userModelSelector,
  currentSectorSelector,
  savedSectorSelector,
} from 'store/selectors/base.selectors';
import { getCurrentEntities } from 'store/selectors/entity.selectors';
import { mergeEntityUpdates } from 'utils/entity';

import { setEntities, deleteEntities } from 'store/api/local';

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

export const saveEntities = ({ state, updated, deleted, entities }) => {
  const isLoggedIn = !!userModelSelector(state);
  const isSaved = includes(
    savedSectorSelector(state),
    currentSectorSelector(state),
  );
  let promise;
  if (isSaved) {
    if (isLoggedIn) {
      // sync updates, deletions, and creations
      promise = Promise.resolve();
    } else {
      // persist updates, deletions, and creations
      promise = Promise.all([setEntities(updated), deleteEntities(deleted)]);
    }
  } else {
    const updates = mergeEntityUpdates(getCurrentEntities(state), entities);
    if (isLoggedIn) {
      // sync full sector
      promise = Promise.resolve();
    } else {
      promise = setEntities(updates);
    }
  }
  return promise.then(() => SuccessToast()).catch(() => ErrorToast());
};
