import Chance from 'chance';
import { omit } from 'lodash';

import { LOCATION_CHANGE } from 'react-router-redux';
import { generateSectorName } from 'utils/name-generator';
import {
  ADD_SAVED_SECTOR,
  REMOVE_SAVED_SECTOR,
  EDIT_SECTOR,
  UPDATE_CONFIGURATION,
} from 'store/actions/sector.actions';
import { INITIALIZE, LOGGED_IN, LOGGED_OUT } from 'store/actions/user.actions';

const initialState = {
  renderSector: false,
  currentSector: null,
  generated: null,
  saved: {},
  configuration: {
    name: generateSectorName(new Chance()),
    isBuilder: false,
    columns: 8,
    rows: 10,
  },
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
    case INITIALIZE: {
      let { generated, currentSector } = state;
      if (generated && action.sectors[state.generated.key]) {
        generated = null;
        currentSector = state.generated.key;
      }
      return {
        ...state,
        generated,
        currentSector,
        saved: action.sectors,
      };
    }
    case LOGGED_OUT:
      return {
        ...state,
        ...initialState,
      };
    case UPDATE_CONFIGURATION:
      return {
        ...state,
        configuration: {
          ...state.configuration,
          [action.key]: action.value,
        },
      };
    case ADD_SAVED_SECTOR: {
      return {
        ...state,
        currentSector: action.sector.key,
        generated: null,
        saved: {
          ...state.saved,
          [action.sector.key]: action.sector,
        },
      };
    }
    case REMOVE_SAVED_SECTOR:
      return {
        ...state,
        saved: omit(state.saved, action.key),
      };
    case EDIT_SECTOR: {
      return {
        ...state,
        currentSector: action.sector.key,
        generated: null,
        saved: {
          ...state.saved,
          [action.sector.key]: action.sector,
        },
      };
    }
    case LOCATION_CHANGE: {
      const { pathname } = action.payload;
      if (['/', '/configure'].indexOf(pathname) >= 0) {
        return {
          ...initialState,
          saved: state.saved,
          configuration: {
            ...initialState.configuration,
            name: generateSectorName(new Chance()),
          },
        };
      }
      if (pathname.startsWith('/sector/')) {
        return {
          ...state,
          renderSector: true,
          currentSector: !state.currentSector
            ? pathname.split('/')[2]
            : state.currentSector,
        };
      }
      return {
        ...state,
        renderSector: false,
      };
    }
    default:
      return state;
  }
}
