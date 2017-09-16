import localForage from 'localforage';
import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { push } from 'react-router-redux';

import { removeByKey } from 'utils/common';
import { getCurrentSector } from 'store/selectors/sector.selectors';

export const EDIT_PLANET = 'EDIT_PLANET';

export function editPlanet(system, planet, changes) {
  return (dispatch, getState) => {
    const state = getState();
    const sector = { ...getCurrentSector(state), updated: Date.now() };
    sector.created = sector.created || Date.now();
    let newKey = planet;
    if (changes.name) {
      newKey = encodeURIComponent(changes.name.toLowerCase());
    }
    const update = {
      ...sector.systems[system].planets[planet],
      ...changes,
      key: newKey,
    };
    return localForage
      .setItem(sector.seed, {
        ...sector,
        systems: {
          ...sector.systems,
          [system]: {
            ...sector.systems[system],
            planets: {
              ...removeByKey(sector.systems[system].planets, planet),
              [newKey]: update,
            },
          },
        },
      })
      .then(() => {
        dispatch(
          push(
            `/sector/system/${system}/planet/${newKey}${state.routing
              .locationBeforeTransitions.search}`,
          ),
        );
        dispatch({
          type: EDIT_PLANET,
          system,
          planet,
          newKey,
          update,
        });
        dispatch(
          ReduxToastrActions.add({
            options: {
              removeOnHover: true,
              showCloseButton: true,
            },
            position: 'bottom-left',
            title: 'Planet Updated',
            message: 'Your sector has been saved.',
            type: 'success',
          }),
        );
      });
  };
}
