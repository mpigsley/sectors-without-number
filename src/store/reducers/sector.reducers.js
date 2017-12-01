import { LOCATION_CHANGE } from 'react-router-redux';
import { generateSectorName } from 'utils/name-generator';
import { ROWS, COLUMNS } from 'constants/defaults';
import {
  UPDATE_CONFIGURATION,
  ACTIVATE_SIDEBAR_EDIT,
  DEACTIVATE_SIDEBAR_EDIT,
  DELETE_ENTITY_IN_EDIT,
  UNDO_DELETE_ENTITY_IN_EDIT,
  UPDATE_ENTITY_IN_EDIT,
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
    case DELETE_ENTITY_IN_EDIT:
      return {
        ...state,
        sidebarEdit: {
          ...state.sidebarEdit,
          children: {
            ...state.sidebarEdit.children,
            [action.entityType]: {
              ...state.sidebarEdit.children[action.entityType],
              [action.entityId]: {
                ...state.sidebarEdit.children[action.entityType][
                  action.entityId
                ],
                isDeleted: true,
              },
            },
          },
        },
      };
    case UNDO_DELETE_ENTITY_IN_EDIT:
      return {
        ...state,
        sidebarEdit: {
          ...state.sidebarEdit,
          children: {
            ...state.sidebarEdit.children,
            [action.entityType]: {
              ...state.sidebarEdit.children[action.entityType],
              [action.entityId]: {
                ...state.sidebarEdit.children[action.entityType][
                  action.entityId
                ],
                isDeleted: false,
              },
            },
          },
        },
      };
    case UPDATE_ENTITY_IN_EDIT:
      return {
        ...state,
        sidebarEdit: {
          ...state.sidebarEdit,
          children: {
            ...state.sidebarEdit.children,
            [action.entityType]: {
              ...state.sidebarEdit.children[action.entityType],
              [action.entityId]: {
                ...state.sidebarEdit.children[action.entityType][
                  action.entityId
                ],
                ...action.updates,
                isUpdated: true,
              },
            },
          },
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
