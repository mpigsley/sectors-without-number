import { uniq, includes } from 'lodash';

import {
  isInitializedSelector,
  currentSectorSelector,
  fetchedNavigationSelector,
  navigationSettingsSelector,
  navigationSettingsRouteSelector,
} from 'store/selectors/base.selectors';
import { createRoute, getNavigationData } from 'store/api/navigation';

export const FETCHED_NAVIGATION = 'FETCHED_NAVIGATION';
export const SET_SYNC_LOCK = 'SET_SYNC_LOCK';
export const OPENED_HELP = 'OPENED_HELP';
export const RESET_NAV_SETTINGS = 'RESET_NAV_SETTINGS';
export const UPDATED_NAV_SETTINGS = 'UPDATED_NAV_SETTINGS';
export const ADDED_ROUTE_LOCATION = 'ADDED_ROUTE_LOCATION';
export const COMPLETED_ROUTE = 'COMPLETED_ROUTE';

export const setSyncLock = () => ({ type: SET_SYNC_LOCK });
export const openHelp = () => ({ type: OPENED_HELP });
export const resetNavSettings = () => ({ type: RESET_NAV_SETTINGS });
export const updateNavSettings = (key, value) => ({
  type: UPDATED_NAV_SETTINGS,
  key,
  value,
});

export const fetchNavigation = sectorId => (dispatch, getState) => {
  const state = getState();
  if (
    includes(fetchedNavigationSelector(state), sectorId) ||
    !isInitializedSelector(state)
  ) {
    return Promise.resolve({});
  }
  return getNavigationData(sectorId).then(routes =>
    dispatch({
      type: FETCHED_NAVIGATION,
      sectorId,
      routes,
    }),
  );
};
export const addRouteLocation = location => (dispatch, getState) => {
  const state = getState();
  const existingLocations = navigationSettingsRouteSelector(state);
  const newLocations = uniq([...existingLocations, location]);
  if (newLocations.length > existingLocations.length) {
    dispatch({
      type: ADDED_ROUTE_LOCATION,
      location,
    });
  }
};
export const completeRoute = () => (dispatch, getState) => {
  const state = getState();
  const { isCreatingRoute, ...update } = navigationSettingsSelector(state);
  if (update.route.length < 2) {
    return dispatch(updateNavSettings('isCreatingRoute', false));
  }

  dispatch(setSyncLock());
  const sectorId = currentSectorSelector(state);
  return createRoute(sectorId, update).then(({ key, route }) =>
    dispatch({ type: COMPLETED_ROUTE, key, route }),
  );
};
