import { push } from 'react-router-redux';

import { removeSector } from 'store/api/local';
import { removeSyncedSector } from 'store/api/firebase';
import { getCurrentSector } from 'store/selectors/sector.selectors';
import { SuccessToast, ErrorToast, creatorOrUpdateSector } from 'store/utils';

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
  const currentSector = getCurrentSector(state);
  return creatorOrUpdateSector(state, {
    ...currentSector,
    [key]: value,
  })
    .then(sector => {
      dispatch({ type: EDIT_SECTOR, sector });
      dispatch(push(`/sector/${sector.key}`));
      dispatch(
        SuccessToast({
          title: 'Sector Updated',
        }),
      );
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
};

export const deleteSector = key => (dispatch, getState) => {
  const state = getState();
  let promise = Promise.resolve();
  if (!state.sector.generated) {
    if (state.user.model) {
      promise = removeSyncedSector(key);
    } else {
      promise = removeSector(key);
    }
  }
  return promise
    .then(() => {
      dispatch(push('/'));
      dispatch({ type: REMOVE_SAVED_SECTOR, key });
      dispatch(
        SuccessToast({
          title: 'Deleted Sector',
          message: state.user.model
            ? 'Sector has been deleted from your account.'
            : 'Sector has been deleted in this browser.',
        }),
      );
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
};

export const saveSector = () => (dispatch, getState) => {
  const state = getState();
  const currentSector = getCurrentSector(state);
  return creatorOrUpdateSector(state, currentSector)
    .then(sector => {
      const url = state.routing.locationBeforeTransitions.pathname.split('/');
      url[2] = sector.key;
      dispatch({ type: ADD_SAVED_SECTOR, sector });
      dispatch(push(url.join('/')));
      dispatch(
        SuccessToast({
          message: state.user.model
            ? 'Sector has been synced.'
            : 'Sector is persisted in this browser.',
        }),
      );
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
};
