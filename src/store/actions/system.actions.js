import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { omit } from 'lodash';

import { EDIT_SECTOR } from 'store/actions/sector.actions';
import { createOrUpdateSector } from 'store/api/local';
import { uploadSector, updateSyncedSector } from 'store/api/firebase';
import { getCurrentSector } from 'store/selectors/sector.selectors';

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
  let sector = getCurrentSector(state);
  sector = {
    ...sector,
    systems: {
      ...sector.systems,
      [system]: {
        ...sector.systems[system],
        ...changes,
      },
    },
  };
  let promise;
  if (state.user.model) {
    if (state.sector.generated) {
      promise = uploadSector(sector, state.user.model.uid);
    } else {
      promise = updateSyncedSector(sector.key, sector);
    }
  } else {
    sector.updated = Date.now();
    sector.created = sector.created || Date.now();
    promise = createOrUpdateSector(sector.key, sector);
  }
  return promise.then((uploadedSector = sector) => {
    const url = state.routing.locationBeforeTransitions.pathname.split('/');
    url[2] = uploadedSector.key;
    dispatch({ type: EDIT_SECTOR, sector: uploadedSector });
    dispatch(push(url.join('/')));
    dispatch(
      ReduxToastrActions.add({
        options: {
          removeOnHover: true,
          showCloseButton: true,
        },
        position: 'bottom-left',
        title: 'System Updated',
        message: 'Your sector has been saved.',
        type: 'success',
      }),
    );
  });
};

export const deleteSystem = system => (dispatch, getState) => {
  const state = getState();
  let sector = getCurrentSector(state);
  sector = {
    ...sector,
    systems: omit(sector.systems, system),
  };
  let promise;
  if (state.user.model) {
    if (state.sector.generated) {
      promise = uploadSector(sector, state.user.model.uid);
    } else {
      promise = updateSyncedSector(sector.key, sector);
    }
  } else {
    sector.updated = Date.now();
    sector.created = sector.created || Date.now();
    promise = createOrUpdateSector(sector.key, sector);
  }
  return promise.then((uploadedSector = sector) => {
    dispatch(push(`/sector/${uploadedSector.key}`));
    dispatch({ type: EDIT_SECTOR, sector: uploadedSector });
    dispatch(
      ReduxToastrActions.add({
        options: {
          removeOnHover: true,
          showCloseButton: true,
        },
        position: 'bottom-left',
        title: 'System Deleted',
        message: 'Your sector has been saved.',
        type: 'success',
      }),
    );
  });
};

export const moveSystem = () => (dispatch, getState) => {
  const state = getState();
  let sector = getCurrentSector(state);
  sector = { ...sector };
  const source = {
    ...sector.systems[state.system.holdKey],
    key: state.system.hoverKey,
  };
  if (sector.systems[state.system.hoverKey]) {
    const destination = { ...sector.systems[state.system.hoverKey] };
    destination.key = state.system.holdKey;
    sector.systems = Object.assign(sector.systems, {
      [state.system.hoverKey]: source,
      [state.system.holdKey]: destination,
    });
  } else {
    sector.systems = omit(sector.systems, state.system.holdKey);
    sector.systems = Object.assign(sector.systems, {
      [state.system.hoverKey]: source,
    });
  }
  let promise;
  if (state.user.model) {
    if (state.sector.generated) {
      promise = uploadSector(sector, state.user.model.uid);
    } else {
      promise = updateSyncedSector(sector.key, sector);
    }
  } else {
    sector.updated = Date.now();
    sector.created = sector.created || Date.now();
    promise = createOrUpdateSector(sector.key, sector);
  }
  return promise.then((uploadedSector = sector) => {
    dispatch(push(`/sector/${uploadedSector.key}`));
    dispatch({ type: EDIT_SECTOR, sector: uploadedSector });
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
