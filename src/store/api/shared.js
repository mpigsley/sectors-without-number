import { pickBy, size, merge } from 'lodash';

import {
  userModelSelector,
  userUidSelector,
  currentSectorSelector,
  currentEntityTypeSelector,
} from 'store/selectors/base.selectors';
import { getCurrentEntities } from 'store/selectors/entity.selectors';
import { isCurrentSectorSaved } from 'store/selectors/sector.selectors';
import { mergeEntityUpdates } from 'utils/entity';

import {
  setEntities,
  deleteEntities as localDeleteEntities,
} from 'store/api/local';
import {
  uploadEntities,
  deleteEntities as syncDeleteEntities,
  updateEntities as syncUpdateEntities,
} from 'store/api/firebase';
import { SuccessToast, ErrorToast } from 'store/utils';
import Entities from 'constants/entities';

export const deleteEntities = ({ state, deleted }) => {
  const isLoggedIn = !!userModelSelector(state);
  const isSaved = isCurrentSectorSaved(state);
  const currentEntityType = currentEntityTypeSelector(state);
  if (!isSaved) {
    return Promise.resolve();
  }
  let promise;
  if (isLoggedIn) {
    promise = syncDeleteEntities(deleted);
  } else {
    promise = localDeleteEntities(deleted);
  }
  const entityName = Entities[currentEntityType || Entities.sector.key].name;
  return promise
    .then(() => ({
      action: SuccessToast({
        title: `${entityName} Deleted`,
        message: `Your ${entityName} has been successfully removed.`,
      }),
    }))
    .catch(err => {
      console.error(err);
      return { action: ErrorToast() };
    });
};

export const saveEntities = ({
  state,
  updated,
  created,
  deleted,
  entities,
}) => {
  const uid = userUidSelector(state);
  const isSaved = isCurrentSectorSaved(state);
  let promise;
  if (isSaved) {
    if (uid) {
      promise = Promise.all([
        uploadEntities(created, uid, currentSectorSelector(state)),
        syncDeleteEntities(deleted),
        syncUpdateEntities(updated),
      ]).then(([uploaded]) => ({ mapping: uploaded.mapping }));
    } else {
      promise = Promise.all([
        setEntities(merge(updated, created) || entities),
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
  return promise
    .then(({ mapping }) => ({
      action: SuccessToast(),
      mapping,
    }))
    .catch(err => {
      console.error(err);
      return { action: ErrorToast() };
    });
};
