import { uniq, includes } from 'lodash';

import {
  isInitializedSelector,
  currentSectorSelector,
  navigationRoutesSelector,
  fetchedNavigationSelector,
  navigationSyncLockSelector,
  navigationSettingsSelector,
  navigationSettingsRouteSelector,
} from 'store/selectors/base.selectors';
import {
  createRoute,
  deleteRoute,
  setVisibility,
  getNavigationData,
} from 'store/api/navigation';

export const FETCHED_NAVIGATION = 'FETCHED_NAVIGATION';
export const SET_SYNC_LOCK = 'SET_SYNC_LOCK';
export const RELEASE_SYNC_LOCK = 'RELEASE_SYNC_LOCK';
export const OPENED_HELP = 'OPENED_HELP';
export const RESET_NAV_SETTINGS = 'RESET_NAV_SETTINGS';
export const CANCEL_NAVIGATION = 'CANCEL_NAVIGATION';
export const UPDATED_NAV_SETTINGS = 'UPDATED_NAV_SETTINGS';
export const ADDED_ROUTE_LOCATION = 'ADDED_ROUTE_LOCATION';
export const COMPLETED_ROUTE = 'COMPLETED_ROUTE';
export const DELETED_ROUTE = 'DELETED_ROUTE';
export const TOGGLED_VISIBILITY = 'TOGGLED_VISIBILITY';
export const SET_ROUTE_LOCATOR = 'SET_ROUTE_LOCATOR';

export const setSyncLock = () => ({ type: SET_SYNC_LOCK });
export const releaseSyncLock = () => ({ type: RELEASE_SYNC_LOCK });
export const openHelp = () => ({ type: OPENED_HELP });
export const resetNavSettings = () => ({ type: RESET_NAV_SETTINGS });
export const cancelNavigation = () => ({ type: CANCEL_NAVIGATION });
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
    dispatch({ type: COMPLETED_ROUTE, sectorId, key, route }),
  );
};

export const removeRoute = routeId => (dispatch, getState) => {
  const state = getState();
  if (navigationSyncLockSelector(state)) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  dispatch(setSyncLock());
  return deleteRoute(sectorId, routeId).then(() =>
    dispatch({ type: DELETED_ROUTE, sectorId, routeId }),
  );
};

export const toggleVisibility = routeId => (dispatch, getState) => {
  const state = getState();
  if (navigationSyncLockSelector(state)) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  const currentRoute = navigationRoutesSelector(state)[sectorId][routeId];
  const isHidden = !currentRoute.isHidden;
  dispatch({ type: TOGGLED_VISIBILITY, sectorId, routeId, isHidden });
  return setVisibility(sectorId, routeId, isHidden).then(() =>
    dispatch(releaseSyncLock()),
  );
};

let locationTimer;
export const locateRoute = routeId => dispatch => {
  if (locationTimer) {
    clearTimeout(locationTimer);
  }
  dispatch({ type: SET_ROUTE_LOCATOR, routeId });
  locationTimer = setTimeout(() => {
    locationTimer = null;
    dispatch({ type: SET_ROUTE_LOCATOR, routeId: null });
  }, 2000);
};
