import { actions as ReduxToastrActions } from 'react-redux-toastr';

import { createOrUpdateSector, removeSector } from 'store/api/local';
import { getCurrentSector } from 'store/selectors/sector.selectors';

export const SET_SAVED_SECTORS = 'SET_SAVED_SECTORS';
export const ADD_SAVED_SECTOR = 'ADD_SAVED_SECTOR';
export const REMOVE_SAVED_SECTOR = 'REMOVE_SAVED_SECTOR';
export const EDIT_SECTOR = 'EDIT_SECTOR';

export function editSector(key, value) {
  return (dispatch, getState) => {
    const state = getState();
    const sector = { ...getCurrentSector(state), updated: Date.now() };
    sector.created = sector.created || Date.now();
    return createOrUpdateSector(sector.seed, {
      ...sector,
      [key]: value,
    }).then(() => {
      dispatch({ type: EDIT_SECTOR, key, value });
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
}

export function setLocalSectors(saved) {
  return { type: SET_SAVED_SECTORS, saved };
}

export function deleteSector(key) {
  return dispatch =>
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
}

export function saveSector() {
  return (dispatch, getState) => {
    const { sector } = getState();
    const key = sector.generated ? sector.generated.seed : sector.currentSector;
    const value = sector.generated || sector.saved[sector.currentSector];
    const update = { ...value, updated: Date.now() };
    update.created = update.created || Date.now();
    return createOrUpdateSector(key, update).then(() => {
      dispatch({ type: ADD_SAVED_SECTOR });
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
}
