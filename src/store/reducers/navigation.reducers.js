import { uniq } from 'lodash';

import {
  FETCHED_NAVIGATION,
  SET_SYNC_LOCK,
  OPENED_HELP,
  RESET_NAV_SETTINGS,
  UPDATED_NAV_SETTINGS,
  ADDED_ROUTE_LOCATION,
  COMPLETED_ROUTE,
} from 'store/actions/navigation.actions';
import { INITIALIZE } from 'store/actions/user.actions';

const initialSettings = () => ({
  route: [],
  isCreatingRoute: false,
  color: '#dbdbdb',
  width: 'normal',
  type: 'solid',
});

export const initialState = {
  settings: initialSettings(),
  routes: {},
  fetched: [],
  isHelpOpen: false,
  syncLock: false,
};

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
    case FETCHED_NAVIGATION:
      return {
        ...state,
        routes: {
          [action.sectorId]: action.routes,
        },
        fetched: uniq([...state.fetched, action.sectorId]).filter(f => f),
      };
    case SET_SYNC_LOCK:
      return { ...state, syncLock: true };
    case OPENED_HELP:
      return { ...state, isHelpOpen: true };
    case RESET_NAV_SETTINGS:
      return { ...state, settings: initialSettings() };
    case UPDATED_NAV_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.key]: action.value,
        },
      };
    case ADDED_ROUTE_LOCATION:
      return {
        ...state,
        settings: {
          ...state.settings,
          route: [...state.settings.route, action.location],
        },
      };
    case COMPLETED_ROUTE:
      return {
        ...state,
        settings: {
          ...state.settings,
          route: [],
          isCreatingRoute: false,
        },
        routes: {
          ...state.routes,
          [action.sectorId]: {
            ...state.routes[action.sectorId],
            [action.key]: action.route,
          },
        },
        syncLock: false,
      };
    default:
      return state;
  }
}
