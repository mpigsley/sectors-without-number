import {
  currentSectorSelector,
  navigationRoutesSelector,
  navigationSyncLockSelector,
  navigationSettingsSelector,
  navigationSettingsRouteSelector,
} from 'store/selectors/base.selectors';
import { createRoute, deleteRoute, setVisibility } from 'store/api/navigation';
import { SuccessToast, ErrorToast } from 'utils/toasts';
import { uniq } from 'constants/lodash';

const ACTION_PREFIX = '@@navigation';
export const SET_SYNC_LOCK = `${ACTION_PREFIX}/SET_SYNC_LOCK`;
export const RELEASED_SYNC_LOCK = `${ACTION_PREFIX}/RELEASED_SYNC_LOCK`;
export const RESET_SETTINGS = `${ACTION_PREFIX}/RESET_SETTINGS`;
export const CANCELED = `${ACTION_PREFIX}/CANCELED`;
export const UPDATED_SETTINGS = `${ACTION_PREFIX}/UPDATED_SETTINGS`;
export const ADDED_ROUTE_LOCATION = `${ACTION_PREFIX}/ADDED_ROUTE_LOCATION`;
export const COMPLETED_ROUTE = `${ACTION_PREFIX}/COMPLETED_ROUTE`;
export const DELETED_ROUTE = `${ACTION_PREFIX}/DELETED_ROUTE`;
export const TOGGLED_VISIBILITY = `${ACTION_PREFIX}/TOGGLED_VISIBILITY`;
export const SET_ROUTE_LOCATOR = `${ACTION_PREFIX}/SET_ROUTE_LOCATOR`;

export const setSyncLock = () => ({ type: SET_SYNC_LOCK });
export const releaseSyncLock = () => ({ type: RELEASED_SYNC_LOCK });
export const resetNavSettings = () => ({ type: RESET_SETTINGS });
export const cancelNavigation = () => ({ type: CANCELED });
export const updateNavSettings = (key, value) => ({
  type: UPDATED_SETTINGS,
  key,
  value,
});

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

export const completeRoute = intl => (dispatch, getState) => {
  const state = getState();
  const { isCreatingRoute, ...update } = navigationSettingsSelector(state);
  if (update.route.length < 2) {
    return dispatch(updateNavSettings('isCreatingRoute', false));
  }

  dispatch(setSyncLock());
  const sectorId = currentSectorSelector(state);
  return createRoute(sectorId, update)
    .then(({ key, route }) => {
      dispatch(
        SuccessToast({
          title: intl.formatMessage({ id: 'misc.sectorSaved' }),
          message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
        }),
      );
      return dispatch({ type: COMPLETED_ROUTE, sectorId, key, route });
    })
    .catch(err => {
      console.error(err);
      return dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const removeRoute = (routeId, intl) => (dispatch, getState) => {
  const state = getState();
  if (navigationSyncLockSelector(state)) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  dispatch(setSyncLock());
  return deleteRoute(sectorId, routeId)
    .then(() => {
      const entityName = intl.formatMessage({ id: 'entity.route' });
      dispatch(
        SuccessToast({
          title: intl.formatMessage(
            { id: 'misc.entityDeleted' },
            { entity: entityName },
          ),
          message: intl.formatMessage(
            { id: 'misc.successfullyRemoved' },
            { entity: entityName },
          ),
        }),
      );
      return dispatch({ type: DELETED_ROUTE, sectorId, routeId });
    })
    .catch(err => {
      console.error(err);
      return dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const toggleVisibility = (routeId, intl) => (dispatch, getState) => {
  const state = getState();
  if (navigationSyncLockSelector(state)) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  const currentRoute = navigationRoutesSelector(state)[sectorId][routeId];
  const isHidden = !currentRoute.isHidden;
  dispatch({ type: TOGGLED_VISIBILITY, sectorId, routeId, isHidden });
  return setVisibility(sectorId, routeId, isHidden)
    .then(() => dispatch(releaseSyncLock()))
    .catch(err => {
      console.error(err);
      return dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
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
