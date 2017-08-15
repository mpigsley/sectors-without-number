import localForage from 'localforage';
import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { push } from 'react-router-redux';

import { removeFromArrayByKey } from 'utils/common';
import { getCurrentSector } from 'store/selectors/sector.selectors';

export const SET_SAVED_SECTORS = 'SET_SAVED_SECTORS';
export const ADD_SAVED_SECTOR = 'ADD_SAVED_SECTOR';
export const REMOVE_SAVED_SECTOR = 'REMOVE_SAVED_SECTOR';

export const SYSTEM_HOLD = 'SYSTEM_HOLD';
export const RELEASE_HOLD = 'RELEASE_HOLD';
export const MOVE_SYSTEM = 'MOVE_SYSTEM';
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
    const key = sector.generated ? sector.generated.seed : sector.currentSector;
    const value = sector.generated || sector.saved[sector.currentSector];
    return localForage.setItem(key, value).then(() => {
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

export function systemHold(key) {
  return { type: SYSTEM_HOLD, key };
}

export function systemRelease() {
  return { type: RELEASE_HOLD };
}

export function moveSystem() {
  return (dispatch, getState) => {
    const state = getState();
    const sector = getCurrentSector(state);
    let systems = { ...sector.systems };
    const source = {
      ...systems[state.sector.holdKey],
      key: state.sector.hoverKey,
    };
    if (systems[state.sector.hoverKey]) {
      const destination = { ...systems[state.sector.hoverKey] };
      destination.key = state.sector.holdKey;
      systems = Object.assign(systems, {
        [state.sector.hoverKey]: source,
        [state.sector.holdKey]: destination,
      });
    } else {
      systems = removeFromArrayByKey(systems, state.sector.holdKey);
      systems = Object.assign(systems, {
        [state.sector.hoverKey]: source,
      });
    }
    return localForage.setItem(sector.seed, { ...sector, systems }).then(() => {
      dispatch(
        push(`/sector${state.routing.locationBeforeTransitions.search}`),
      );
      dispatch({ type: MOVE_SYSTEM, key: sector.seed, systems });
      dispatch(
        ReduxToastrActions.add({
          options: {
            removeOnHover: true,
            showCloseButton: true,
          },
          position: 'bottom-left',
          title: 'System Moved',
          message: 'Your sector has been saved.',
          type: 'success',
        }),
      );
    });
  };
}

export function sectorHoverStart(key) {
  return { type: SYSTEM_HOVER_START, key };
}

export function sectorHoverEnd(key) {
  return { type: SYSTEM_HOVER_END, key };
}
