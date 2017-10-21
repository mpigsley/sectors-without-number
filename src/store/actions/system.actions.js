import { push } from 'react-router-redux';
import { omit } from 'lodash';

import { EDIT_SECTOR } from 'store/actions/sector.actions';
import { getCurrentSector } from 'store/selectors/sector.selectors';
import { SuccessToast, ErrorToast, creatorOrUpdateSector } from 'store/utils';

export const SYSTEM_HOLD = 'SYSTEM_HOLD';
export const RELEASE_HOLD = 'RELEASE_HOLD';
export const SYSTEM_HOVER_START = 'SYSTEM_HOVER_START';
export const SYSTEM_HOVER_END = 'SYSTEM_HOVER_END';
export const OPEN_SYSTEM_CREATE = 'OPEN_SYSTEM_CREATE';
export const CLOSE_SYSTEM_CREATE = 'CLOSE_SYSTEM_CREATE';

export const openSystemCreate = key => ({ type: OPEN_SYSTEM_CREATE, key });
export const closeSystemCreate = () => ({ type: CLOSE_SYSTEM_CREATE });
export const systemHold = key => ({ type: SYSTEM_HOLD, key });
export const systemRelease = () => ({ type: RELEASE_HOLD });
export const systemHoverStart = key => ({ type: SYSTEM_HOVER_START, key });
export const systemHoverEnd = key => ({ type: SYSTEM_HOVER_END, key });

export const editSystem = (system, changes) => (dispatch, getState) => {
  const state = getState();
  const currentSector = getCurrentSector(state);
  return creatorOrUpdateSector(state, {
    ...currentSector,
    systems: {
      ...currentSector.systems,
      [system]: {
        ...currentSector.systems[system],
        ...changes,
      },
    },
  })
    .then(sector => {
      const url = state.routing.locationBeforeTransitions.pathname.split('/');
      url[2] = sector.key;
      dispatch({ type: EDIT_SECTOR, sector });
      dispatch(push(url.join('/')));
      dispatch(
        SuccessToast({
          title: 'System Updated',
        }),
      );
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
};

export const deleteSystem = system => (dispatch, getState) => {
  const state = getState();
  const currentSector = getCurrentSector(state);
  return creatorOrUpdateSector(state, {
    ...currentSector,
    systems: omit(currentSector.systems, system),
  })
    .then(sector => {
      dispatch(push(`/sector/${sector.key}`));
      dispatch({ type: EDIT_SECTOR, sector });
      dispatch(
        SuccessToast({
          title: 'System Deleted',
        }),
      );
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
};

export const moveSystem = () => (dispatch, getState) => {
  const state = getState();
  const currentSector = { ...getCurrentSector(state) };
  const source = {
    ...currentSector.systems[state.system.holdKey],
    key: state.system.hoverKey,
  };
  if (currentSector.systems[state.system.hoverKey]) {
    const destination = { ...currentSector.systems[state.system.hoverKey] };
    destination.key = state.system.holdKey;
    currentSector.systems = Object.assign(currentSector.systems, {
      [state.system.hoverKey]: source,
      [state.system.holdKey]: destination,
    });
  } else {
    currentSector.systems = omit(currentSector.systems, state.system.holdKey);
    currentSector.systems = Object.assign(currentSector.systems, {
      [state.system.hoverKey]: source,
    });
  }
  return creatorOrUpdateSector(state, currentSector)
    .then(sector => {
      dispatch(push(`/sector/${sector.key}`));
      dispatch({ type: EDIT_SECTOR, sector });
      dispatch(
        SuccessToast({
          title: 'System Moved',
        }),
      );
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
};
