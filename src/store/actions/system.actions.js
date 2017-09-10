import localForage from 'localforage';
import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { push } from 'react-router-redux';

import { removeByKey } from 'utils/common';
import { getCurrentSector } from 'store/selectors/sector.selectors';

export const SYSTEM_HOLD = 'SYSTEM_HOLD';
export const RELEASE_HOLD = 'RELEASE_HOLD';
export const MOVE_SYSTEM = 'MOVE_SYSTEM';
export const SYSTEM_HOVER_START = 'SYSTEM_HOVER_START';
export const SYSTEM_HOVER_END = 'SYSTEM_HOVER_END';
export const EDIT_SYSTEM = 'EDIT_SYSTEM';

export function editSystem(system, key, value) {
  return (dispatch, getState) => {
    const state = getState();
    const sector = { ...getCurrentSector(state) };
    const updateSystem = { ...sector.systems[system], [key]: value };
    return localForage
      .setItem(sector.seed, {
        ...sector,
        systems: {
          ...sector.systems,
          [system]: updateSystem,
        },
      })
      .then(() => {
        dispatch({ type: EDIT_SYSTEM, key: system, system: updateSystem });
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
      ...systems[state.system.holdKey],
      key: state.system.hoverKey,
    };
    if (systems[state.system.hoverKey]) {
      const destination = { ...systems[state.system.hoverKey] };
      destination.key = state.system.holdKey;
      systems = Object.assign(systems, {
        [state.system.hoverKey]: source,
        [state.system.holdKey]: destination,
      });
    } else {
      systems = removeByKey(systems, state.system.holdKey);
      systems = Object.assign(systems, {
        [state.system.hoverKey]: source,
      });
    }
    return localForage.setItem(sector.seed, { ...sector, systems }).then(() => {
      dispatch(
        push(`/sector${state.routing.locationBeforeTransitions.search}`),
      );
      dispatch({ type: RELEASE_HOLD });
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

export function systemHoverStart(key) {
  return { type: SYSTEM_HOVER_START, key };
}

export function systemHoverEnd(key) {
  return { type: SYSTEM_HOVER_END, key };
}
