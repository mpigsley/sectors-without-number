import { push } from 'react-router-redux';
import { omit } from 'lodash';

import { EDIT_SECTOR } from 'store/actions/sector.actions';
import { getCurrentSector } from 'store/selectors/sector.selectors';
import { SuccessToast, ErrorToast, creatorOrUpdateSector } from 'store/utils';

export const editPlanet = (system, planet, changes) => (dispatch, getState) => {
  const state = getState();
  const currentSector = getCurrentSector(state);
  const newKey = changes.name
    ? encodeURIComponent(changes.name.toLowerCase())
    : planet;
  return creatorOrUpdateSector(state, {
    ...currentSector,
    systems: {
      ...currentSector.systems,
      [system]: {
        ...currentSector.systems[system],
        planets: {
          ...omit(currentSector.systems[system].planets, planet),
          [newKey]: {
            ...currentSector.systems[system].planets[planet],
            ...changes,
            key: newKey,
          },
        },
      },
    },
  })
    .then(sector => {
      dispatch(push(`/sector/${sector.key}/system/${system}/planet/${newKey}`));
      dispatch({ type: EDIT_SECTOR, sector });
      dispatch(
        SuccessToast({
          title: 'Planet Updated',
        }),
      );
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
};

export const deletePlanet = (system, planet) => (dispatch, getState) => {
  const state = getState();
  const currentSector = getCurrentSector(state);
  return creatorOrUpdateSector(state, {
    ...currentSector,
    systems: {
      ...currentSector.systems,
      [system]: {
        ...currentSector.systems[system],
        planets: omit(currentSector.systems[system].planets, planet),
      },
    },
  })
    .then(sector => {
      dispatch(push(`/sector/${sector.key}/system/${system}`));
      dispatch({ type: EDIT_SECTOR, sector });
      dispatch(
        SuccessToast({
          title: 'Planet Deleted',
        }),
      );
    })
    .catch(err => {
      dispatch(ErrorToast());
      console.error(err);
    });
};
