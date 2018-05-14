import { navigationSettingsSelector } from 'store/selectors/base.selectors';

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
export const addRouteLocation = location => ({
  type: ADDED_ROUTE_LOCATION,
  location,
});

export const completeRoute = () => (dispatch, getState) => {
  const state = getState();
  const { route } = navigationSettingsSelector(state);
  if (route.length < 2) {
    return dispatch(updateNavSettings('isCreatingRoute', false));
  }

  dispatch(setSyncLock());
  // Sync with firestore
  return dispatch({ type: COMPLETED_ROUTE, key: 'asdf', route: 'asdf' });
};
