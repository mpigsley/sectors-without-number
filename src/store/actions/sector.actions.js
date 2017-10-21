import { actions as ReduxToastrActions } from 'react-redux-toastr';

import { createOrUpdateSector, removeSector } from 'store/api/local';
import { uploadSector, updateSyncedSector } from 'store/api/firebase';
import { getCurrentSector } from 'store/selectors/sector.selectors';

export const GENERATE_SECTOR = 'GENERATE_SECTOR';
export const EDIT_SECTOR = 'EDIT_SECTOR';
export const REMOVE_SAVED_SECTOR = 'REMOVE_SAVED_SECTOR';
export const ADD_SAVED_SECTOR = 'ADD_SAVED_SECTOR';
export const UPDATE_CONFIGURATION = 'UPDATE_CONFIGURATION';

export const updateConfiguration = (key, value) => ({
  type: UPDATE_CONFIGURATION,
  key,
  value,
});

export const editSector = (key, value) => (dispatch, getState) => {
  const state = getState();
  let sector = { ...getCurrentSector(state), [key]: value };
  let promise;
  if (state.user.model) {
    if (state.sector.generated) {
      promise = uploadSector(sector);
    } else {
      promise = updateSyncedSector(sector.key, key, value);
    }
  } else {
    sector = { ...sector, updated: Date.now() };
    sector.created = sector.created || Date.now();
    promise = createOrUpdateSector(sector.key, {
      ...sector,
      [key]: value,
    });
  }
  return promise.then(uploadedSector => {
    dispatch({ type: EDIT_SECTOR, sector: uploadedSector || sector });
    dispatch(
      ReduxToastrActions.add({
        options: {
          removeOnHover: true,
          showCloseButton: true,
        },
        position: 'bottom-left',
        title: 'Sector Updated',
        message: 'Your sector has been saved.',
        type: 'success',
      }),
    );
  });
};

export const deleteSector = key => dispatch =>
  removeSector(key).then(() => {
    dispatch({ type: REMOVE_SAVED_SECTOR, key });
    dispatch(
      ReduxToastrActions.add({
        options: {
          removeOnHover: true,
          showCloseButton: true,
        },
        position: 'bottom-left',
        title: 'Deleted Sector',
        message: 'Sector has been deleted in this browser.',
        type: 'success',
      }),
    );
  });

export const saveSector = () => (dispatch, getState) => {
  const state = getState();
  const key = state.sector.generated
    ? state.sector.generated.key
    : state.sector.currentSector;
  const value =
    state.sector.generated || state.sector.saved[state.sector.currentSector];
  const sector = { ...value, updated: Date.now() };
  sector.created = sector.created || Date.now();
  return createOrUpdateSector(key, sector).then(() => {
    dispatch({ type: ADD_SAVED_SECTOR, sector });
    dispatch(
      ReduxToastrActions.add({
        options: {
          removeOnHover: true,
          showCloseButton: true,
        },
        position: 'bottom-left',
        title: 'Saved Sector',
        message: 'Sector is persisted in this browser.',
        type: 'success',
      }),
    );
  });
};
