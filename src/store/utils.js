import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { omit } from 'lodash';

import { setSector } from 'store/api/local';
import { uploadSector, updateSyncedSector } from 'store/api/firebase';

export const SuccessToast = ({
  title = 'Sector Saved',
  message = 'Your sector has been saved.',
}) =>
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

export const creatorOrUpdateSector = (state, sector) => {
  let promise;
  if (state.user.model) {
    if (state.sector.generated) {
      promise = uploadSector(sector, state.user.model.uid);
    } else {
      promise = updateSyncedSector(sector.key, sector);
    }
  } else {
    promise = setSector(
      sector.key,
      omit(
        {
          ...sector,
          updated: Date.now(),
          created: sector.created || Date.now(),
        },
        'isCloudSave',
      ),
    );
  }
  return promise.then((uploadedSector = sector) => uploadedSector);
};
