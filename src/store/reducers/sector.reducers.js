import Chance from 'chance';
import { omit } from 'lodash';

import { LOCATION_CHANGE } from 'react-router-redux';
import sectorGenerator from 'utils/sector-generator';
import {
  SET_SAVED_SECTORS,
  ADD_SAVED_SECTOR,
  REMOVE_SAVED_SECTOR,
  EDIT_SECTOR,
} from 'store/actions/sector.actions';
import {
  MOVE_SYSTEM,
  EDIT_SYSTEM,
  DELETE_SYSTEM,
} from 'store/actions/system.actions';
import { EDIT_PLANET, DELETE_PLANET } from 'store/actions/planet.actions';

const defaultColumns = 8;
const defaultRows = 10;
const initialState = {
  renderSector: false,
  currentSector: null,
  generated: null,
  saved: {},
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case SET_SAVED_SECTORS: {
      let generated = state.generated;
      let currentSector = state.currentSector;
      if (!!state.generated && !!action.saved[state.generated.seed]) {
        generated = null;
        currentSector = state.generated.seed;
      }
      return {
        ...state,
        generated,
        currentSector,
        saved: action.saved,
      };
    }
    case ADD_SAVED_SECTOR: {
      const key = state.generated ? state.generated.seed : state.currentSector;
      const value = state.generated || state.saved[key];
      return {
        ...state,
        currentSector: key,
        generated: null,
        saved: {
          ...state.saved,
          [key]: value,
        },
      };
    }
    case REMOVE_SAVED_SECTOR:
      return {
        ...state,
        saved: omit(state.saved, action.key),
      };
    case EDIT_SECTOR: {
      const existingSector =
        state.generated || state.saved[state.currentSector];
      return {
        ...state,
        currentSector: existingSector.seed,
        generated: null,
        saved: {
          ...state.saved,
          [existingSector.seed]: {
            ...existingSector,
            [action.key]: action.value,
          },
        },
      };
    }
    case LOCATION_CHANGE:
      if (['/', '/configure'].indexOf(action.payload.pathname) >= 0) {
        return {
          ...initialState,
          saved: state.saved,
        };
      }
      if (action.payload.pathname.startsWith('/sector')) {
        const seed =
          action.payload.query.s || new Chance().hash({ length: 15 });
        const rows = Math.min(action.payload.query.r || defaultRows, 20);
        const columns = Math.min(action.payload.query.c || defaultColumns, 20);
        const isBuilder = !!action.payload.query.b;

        const update = { renderSector: true };
        if (!state.currentSector) {
          const saved = state.saved[seed];
          if (saved) {
            update.currentSector = seed;
          } else if (!state.generated) {
            update.currentSector = 'generated';
            update.generated = sectorGenerator({
              seed,
              columns,
              rows,
              isBuilder,
            });
          }
        }
        return {
          ...state,
          renderSector: true,
          ...update,
        };
      }
      return {
        ...state,
        renderSector: false,
      };
    case MOVE_SYSTEM: {
      const existingSector = state.generated || state.saved[action.key];
      return {
        ...state,
        currentSector: action.key,
        generated: null,
        saved: {
          ...state.saved,
          [action.key]: {
            ...existingSector,
            systems: action.systems,
          },
        },
      };
    }
    case EDIT_SYSTEM: {
      const existingSector =
        state.generated || state.saved[state.currentSector];
      return {
        ...state,
        currentSector: existingSector.seed,
        generated: null,
        saved: {
          ...state.saved,
          [existingSector.seed]: {
            ...existingSector,
            systems: {
              ...existingSector.systems,
              [action.system]: action.update,
            },
          },
        },
      };
    }
    case DELETE_SYSTEM: {
      const existingSector =
        state.generated || state.saved[state.currentSector];
      return {
        ...state,
        currentSector: existingSector.seed,
        generated: null,
        saved: {
          ...state.saved,
          [existingSector.seed]: {
            ...existingSector,
            systems: omit(existingSector.systems, action.system),
          },
        },
      };
    }
    case EDIT_PLANET: {
      const existingSector =
        state.generated || state.saved[state.currentSector];
      return {
        ...state,
        currentSector: existingSector.seed,
        generated: null,
        saved: {
          ...state.saved,
          [existingSector.seed]: {
            ...existingSector,
            systems: {
              ...existingSector.systems,
              [action.system]: {
                ...existingSector.systems[action.system],
                planets: {
                  ...omit(
                    existingSector.systems[action.system].planets,
                    action.planet,
                  ),
                  [action.newKey]: action.update,
                },
              },
            },
          },
        },
      };
    }
    case DELETE_PLANET: {
      const existingSector =
        state.generated || state.saved[state.currentSector];
      return {
        ...state,
        currentSector: existingSector.seed,
        generated: null,
        saved: {
          ...state.saved,
          [existingSector.seed]: {
            ...existingSector,
            systems: {
              ...existingSector.systems,
              [action.system]: {
                ...existingSector.systems[action.system],
                planets: omit(
                  existingSector.systems[action.system].planets,
                  action.planet,
                ),
              },
            },
          },
        },
      };
    }
    default:
      return state;
  }
}
