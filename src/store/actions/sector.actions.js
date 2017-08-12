import localForage from 'localforage';
import { actions as ReduxToastrActions } from 'react-redux-toastr';

export const SET_SAVED_SECTORS = 'SET_SAVED_SECTORS';
export const ADD_SAVED_SECTOR = 'ADD_SAVED_SECTOR';
export const UPDATE_SECTOR = 'UPDATE_SECTOR_CONFIG';
export const SECTOR_HOVER_START = 'SECTOR_HOVER_START';
export const SECTOR_HOVER_END = 'SECTOR_HOVER_END';

const ConfigKeys = {
  seed: 'seed',
  columns: 'columns',
  rows: 'rows',
};

export function setSavedSectors(saved) {
  return { type: SET_SAVED_SECTORS, saved };
}

export function deleteSector(key) {}

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

export function updateSector(key, value) {
  if (ConfigKeys[key]) {
    return { type: UPDATE_SECTOR, key, value };
  }
  return null;
}

export function sectorHoverStart(key) {
  return { type: SECTOR_HOVER_START, key };
}

export function sectorHoverEnd(key) {
  return { type: SECTOR_HOVER_END, key };
}
