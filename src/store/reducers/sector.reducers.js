import Chance from 'chance';

import { LOCATION_CHANGE } from 'react-router-redux';
import sectorGenerator from 'utils/sector-generator';
import {
  SET_SAVED_SECTORS,
  ADD_SAVED_SECTOR,
  REMOVE_SAVED_SECTOR,
  SYSTEM_HOLD,
  SYSTEM_RELEASE,
  SYSTEM_HOVER_START,
  SYSTEM_HOVER_END,
} from '../actions/sector.actions';

const defaultColumns = 8;
const defaultRows = 10;
const initialState = {
  renderSector: false,
  hoverKey: null,
  currentSector: null,
  generated: null,
  saved: {},
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case SET_SAVED_SECTORS:
      return {
        ...state,
        saved: action.saved,
      };
    case ADD_SAVED_SECTOR:
      return {
        ...state,
        saved: {
          ...state.saved,
          [action.savedSector.seed]: action.savedSector,
        },
      };
    case REMOVE_SAVED_SECTOR:
      return {
        ...state,
        saved: Object.keys(state.saved).reduce((result, key) => {
          if (key !== action.key) {
            return { ...result, [key]: state.saved[key] };
          }
          return result;
        }, {}),
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
    case SYSTEM_RELEASE:
      return { ...state, holdKey: null };
    case SYSTEM_HOVER_START:
      return { ...state, hoverKey: action.key };
    case SYSTEM_HOVER_END:
      return { ...state, hoverKey: null };
    default:
      return state;
  }
}
