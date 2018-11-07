import { omit } from 'constants/lodash';
import {
  SET_SYNC_LOCK,
  RELEASED_SYNC_LOCK,
  RESET_SETTINGS,
  CANCELED,
  UPDATED_SETTINGS,
  ADDED_ROUTE_LOCATION,
  COMPLETED_ROUTE,
  DELETED_ROUTE,
  TOGGLED_VISIBILITY,
  SET_ROUTE_LOCATOR,
} from 'store/actions/navigation.actions';
import {
  FETCHED_SECTOR,
  INITIALIZED,
  EXPAND_SECTOR,
} from 'store/actions/combined.actions';

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
  syncLock: false,
  routeLocator: null,
};

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
    case FETCHED_SECTOR:
    case EXPAND_SECTOR:
      return {
        ...state,
        routes: {
          ...state.routes,
          [action.sectorId]: {
            ...(state.routes[action.sectorId] || {}),
            ...(action.routes || {}),
          },
        },
      };
    case SET_SYNC_LOCK:
      return { ...state, syncLock: true };
    case RELEASED_SYNC_LOCK:
      return { ...state, syncLock: false };
    case RESET_SETTINGS:
      return { ...state, settings: initialSettings() };
    case CANCELED:
      return {
        ...state,
        settings: {
          ...state.settings,
          route: [],
          isCreatingRoute: false,
        },
      };
    case UPDATED_SETTINGS:
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
    case DELETED_ROUTE:
      return {
        ...state,
        routes: {
          ...state.routes,
          [action.sectorId]: omit(
            state.routes[action.sectorId],
            action.routeId,
          ),
        },
        syncLock: false,
      };
    case TOGGLED_VISIBILITY:
      return {
        ...state,
        routes: {
          ...state.routes,
          [action.sectorId]: {
            ...state.routes[action.sectorId],
            [action.routeId]: {
              ...state.routes[action.sectorId][action.routeId],
              isHidden: action.isHidden,
            },
          },
        },
        syncLock: true,
      };
    case SET_ROUTE_LOCATOR:
      return {
        ...state,
        routeLocator: action.routeId,
      };
    default:
      return state;
  }
}
