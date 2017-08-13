import localForage from 'localforage';
import { actions as ReduxToastrActions } from 'react-redux-toastr';

export const SET_SAVED_SECTORS = 'SET_SAVED_SECTORS';
export const ADD_SAVED_SECTOR = 'ADD_SAVED_SECTOR';
export const REMOVE_SAVED_SECTOR = 'REMOVE_SAVED_SECTOR';
export const SYSTEM_HOLD = 'SYSTEM_HOLD';
export const SYSTEM_RELEASE = 'SYSTEM_RELEASE';
export const SYSTEM_HOVER_START = 'SYSTEM_HOVER_START';
export const SYSTEM_HOVER_END = 'SYSTEM_HOVER_END';

export function setSavedSectors(saved) {
  return { type: SET_SAVED_SECTORS, saved };
}

export function deleteSector(key) {
  return dispatch =>
    localForage.removeItem(key).then(() => {
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
    const key = sector.generated.seed;
    return localForage.setItem(key, sector.generated).then(() => {
      dispatch({ type: ADD_SAVED_SECTOR, savedSector: sector.generated });
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

export function systemHold(key) {
  return { type: SYSTEM_HOLD, key };
}

export function systemRelease() {
  return { type: SYSTEM_RELEASE };
}

export function sectorHoverStart(key) {
  return { type: SYSTEM_HOVER_START, key };
}

export function sectorHoverEnd(key) {
  return { type: SYSTEM_HOVER_END, key };
}
