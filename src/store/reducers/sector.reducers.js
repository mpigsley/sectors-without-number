import { LOCATION_CHANGE } from 'react-router-redux';
import { generateSectorName } from 'utils/name-generator';
import { ROWS, COLUMNS } from 'constants/defaults';
import { UPDATE_CONFIGURATION } from 'store/actions/sector.actions';
import { INITIALIZE, LOGGED_IN, LOGGED_OUT } from 'store/actions/user.actions';

const initialState = {
  renderSector: false,
  currentSector: null,
  currentEntityType: null,
  currentEntity: null,
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
      const commonState = {
        isSidebarEditActive: false,
        sidebarEdit: initialState.sidebarEdit,
      };
      if (['/', '/configure'].indexOf(pathname) >= 0) {
        return {
          ...initialState,
          ...commonState,
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
          ...commonState,
          renderSector: true,
          currentSector: pathname.split('/')[2],
          currentEntityType: pathname.split('/')[3],
          currentEntity: pathname.split('/')[4],
        };
      }
      return {
        ...state,
        ...commonState,
        renderSector: false,
      };
    }
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
    default:
      return state;
  }
}
