import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { pickBy, size } from 'lodash';

import {
  userModelSelector,
  userUidSelector,
  currentEntityTypeSelector,
} from 'store/selectors/base.selectors';
import { getCurrentEntities } from 'store/selectors/entity.selectors';
import { isCurrentSectorSaved } from 'store/selectors/sector.selectors';
import { mergeEntityUpdates } from 'utils/entity';

import {
  setEntity,
  setEntities,
  deleteEntities as localDeleteEntities,
} from 'store/api/local';
import { uploadEntities } from 'store/api/firebase';
import Entities from 'constants/entities';

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

export const saveEntity = ({ state, entityType, entityId, update }) => {
  const isLoggedIn = !!userModelSelector(state);
  let promise;
  if (isLoggedIn) {
    promise = Promise.resolve();
  } else {
    promise = setEntity(update, `${entityType}.${entityId}`);
  }
  const entityName = Entities[entityType || Entities.sector.key].name;
  return promise
    .then(() =>
      SuccessToast({
        title: `${entityName} Updated`,
      }),
    )
    .catch(() => ErrorToast());
};

export const deleteEntities = ({ state, deleted }) => {
  const isLoggedIn = !!userModelSelector(state);
  const isSaved = isCurrentSectorSaved(state);
  const currentEntityType = currentEntityTypeSelector(state);
  if (!isSaved) {
    return Promise.resolve();
  }
  let promise;
  if (isLoggedIn) {
    promise = Promise.resolve();
  } else {
    promise = localDeleteEntities(deleted);
  }
  const entityName = Entities[currentEntityType || Entities.sector.key].name;
  return promise
    .then(() =>
      SuccessToast({
        title: `${entityName} Deleted`,
        message: `Your ${entityName} has been successfully removed.`,
      }),
    )
    .catch(() => ErrorToast());
};

export const saveEntities = ({ state, updated, deleted, entities }) => {
  const uid = userUidSelector(state);
  const isSaved = isCurrentSectorSaved(state);
  let promise;
  if (isSaved) {
    if (uid) {
      // sync updates, deletions, and creations
      promise = Promise.resolve();
    } else {
      // persist updates, deletions, and creations
      promise = Promise.all([
        setEntities(updated || entities),
        localDeleteEntities(deleted),
      ]);
    }
  } else {
    const updates = pickBy(
      mergeEntityUpdates(getCurrentEntities(state), entities),
      size,
    );
    if (uid) {
      promise = uploadEntities(updates, uid);
    } else {
      promise = setEntities(updates);
    }
  }
  return promise.then(() => SuccessToast()).catch(() => ErrorToast());
};
