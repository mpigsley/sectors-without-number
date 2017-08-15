import Chance from 'chance';

import { LOCATION_CHANGE } from 'react-router-redux';
import sectorGenerator from 'utils/sector-generator';
import { removeByKey } from 'utils/common';
import {
  SET_SAVED_SECTORS,
  ADD_SAVED_SECTOR,
  REMOVE_SAVED_SECTOR,
  SYSTEM_HOLD,
  RELEASE_HOLD,
  MOVE_SYSTEM,
  SYSTEM_HOVER_START,
  SYSTEM_HOVER_END,
} from '../actions/sector.actions';

const defaultColumns = 8;
const defaultRows = 10;
const initialState = {
  renderSector: false,
  hoverKey: null,
  holdKey: null,
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
        saved: removeByKey(state.saved, action.key),
      };
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

        const update = { renderSector: true };
        if (!state.currentSector) {
          const saved = state.saved[seed];
          if (saved) {
            update.currentSector = seed;
          } else if (!state.generated) {
            update.currentSector = 'generated';
            update.generated = sectorGenerator({ seed, columns, rows });
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
    case SYSTEM_HOLD:
      return { ...state, holdKey: action.key };
    case RELEASE_HOLD:
      return { ...state, holdKey: null };
    case MOVE_SYSTEM: {
      const existingSector = state.generated || state.saved[action.key];
      return {
        ...state,
        currentSector: action.key,
        generated: null,
        holdKey: null,
        saved: {
          ...state.saved,
          [action.key]: {
            ...existingSector,
            systems: action.systems,
          },
        },
      };
    }
    case SYSTEM_HOVER_START:
      return { ...state, hoverKey: action.key };
    case SYSTEM_HOVER_END:
      return { ...state, hoverKey: null };
    default:
      return state;
  }
}
