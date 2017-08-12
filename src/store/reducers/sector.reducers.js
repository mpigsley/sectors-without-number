import Chance from 'chance';

import { LOCATION_CHANGE } from 'react-router-redux';
import sectorGenerator from 'utils/sector-generator';
import {
  SET_SAVED_SECTORS,
  ADD_SAVED_SECTOR,
  UPDATE_SECTOR,
  SECTOR_HOVER_START,
  SECTOR_HOVER_END,
} from '../actions/sector.actions';

const defaultColumns = 8;
const defaultRows = 10;
const initialState = {
  renderSector: false,
  hoverKey: null,
  generated: null,
  saved: {},
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SECTOR:
      return {
        ...state,
        [action.key]: action.value,
      };
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
        let generated = state.generated;
        if (!state.generated) {
          generated =
            state.saved[seed] || sectorGenerator({ seed, columns, rows });
        }
        return {
          ...state,
          renderSector: true,
          generated,
        };
      }
      return {
        ...state,
        renderSector: false,
      };
    case SECTOR_HOVER_START:
      return { ...state, hoverKey: action.key };
    case SECTOR_HOVER_END:
      return { ...state, hoverKey: null };
    default:
      return state;
  }
}
