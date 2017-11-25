import { omit } from 'lodash';

import { LOCATION_CHANGE } from 'react-router-redux';
import { generateSectorName } from 'utils/name-generator';
import { ROWS, COLUMNS } from 'constants/defaults';
import {
  UPDATE_CONFIGURATION,
  ACTIVATE_SIDEBAR_EDIT,
  DEACTIVATE_SIDEBAR_EDIT,
  ADD_SAVED_SECTOR,
  REMOVE_SAVED_SECTOR,
  EDIT_SECTOR,
} from 'store/actions/sector.actions';
import { INITIALIZE, LOGGED_IN, LOGGED_OUT } from 'store/actions/user.actions';

const initialState = {
  renderSector: false,
  currentSector: null,
  currentEntityType: null,
  currentEntity: null,
  isSidebarEditActive: false,
  sidebarEdit: {
    entity: {},
    children: {},
  },
  configuration: {
    sectorName: generateSectorName(),
    isBuilder: false,
    columns: COLUMNS,
    rows: ROWS,
  },
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const { pathname } = action.payload;
      if (['/', '/configure'].indexOf(pathname) >= 0) {
        return {
          ...initialState,
          saved: state.saved,
          configuration: {
            ...initialState.configuration,
            name: generateSectorName(),
          },
        };
      }
      if (pathname.startsWith('/sector/')) {
        return {
          ...state,
          renderSector: true,
          currentSector: pathname.split('/')[2],
          currentEntityType: pathname.split('/')[3],
          currentEntity: pathname.split('/')[4],
        };
      }
      return {
        ...state,
        renderSector: false,
      };
    }
    case ACTIVATE_SIDEBAR_EDIT:
      return {
        ...state,
        isSidebarEditActive: true,
        sidebarEdit: {
          entity: action.entity,
          children: action.children,
        },
      };
    case DEACTIVATE_SIDEBAR_EDIT:
      return {
        ...state,
        isSidebarEditActive: false,
        sidebarEdit: initialState.sidebarEdit,
      };
    case UPDATE_CONFIGURATION:
      return {
        ...state,
        configuration: {
          ...state.configuration,
          [action.key]: action.value,
        },
      };

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
    default:
      return state;
  }
}
