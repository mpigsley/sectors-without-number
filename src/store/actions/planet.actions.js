import { actions as ReduxToastrActions } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { omit } from 'lodash';

import { createOrUpdateSector } from 'store/api/local';
import { getCurrentSector } from 'store/selectors/sector.selectors';

export const EDIT_PLANET = 'EDIT_PLANET';
export const DELETE_PLANET = 'DELETE_PLANET';

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
    return createOrUpdateSector(sector.seed, {
      ...sector,
      systems: {
        ...sector.systems,
        [system]: {
          ...sector.systems[system],
          planets: {
            ...omit(sector.systems[system].planets, planet),
            [newKey]: update,
          },
        },
      },
    }).then(() => {
      dispatch(push(`/sector/${sector.key}/system/${system}/planet/${newKey}`));
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

export function deletePlanet(system, planet) {
  return (dispatch, getState) => {
    const state = getState();
    const sector = { ...getCurrentSector(state), updated: Date.now() };
    const planets = omit(sector.systems[system].planets, planet);
    return createOrUpdateSector(sector.seed, {
      ...sector,
      systems: {
        ...sector.systems,
        [system]: {
          ...sector.systems[system],
          planets,
        },
      },
    }).then(() => {
      dispatch(push(`/sector/${sector.key}/system/${system}`));
      dispatch({ type: DELETE_PLANET, system, planet });
      dispatch(
        ReduxToastrActions.add({
          options: {
            removeOnHover: true,
            showCloseButton: true,
          },
          position: 'bottom-left',
          title: 'Planet Deleted',
          message: 'Your sector has been saved.',
          type: 'success',
        }),
      );
    });
  };
}
