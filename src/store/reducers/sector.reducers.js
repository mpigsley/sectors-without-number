import Chance from 'chance';
import QueryString from 'query-string';

import { LOCATION_CHANGE } from 'react-router-redux';
import sectorGenerator from 'utils/sector-generator';
import {
  SET_SAVED_SECTORS,
  UPDATE_SECTOR,
  SECTOR_HOVER_START,
  SECTOR_HOVER_END,
} from '../actions/sector.actions';

const defaultColumns = 8;
const defaultRows = 10;
const query = QueryString.parse(window.location.search);
const initialState = {
  seed: query.s || new Chance().hash({ length: 15 }),
  renderSector: false,
  columns: query.c ? Number.parseInt(query.c, 10) : defaultColumns,
  rows: query.r ? Number.parseInt(query.r, 10) : defaultRows,
  hoverKey: null,
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
    case LOCATION_CHANGE:
      if (
        action.payload.pathname === '/' ||
        action.payload.pathname === '/configure'
      ) {
        return {
          ...initialState,
          seed: new Chance().hash({ length: 15 }),
          columns: defaultColumns,
          rows: defaultRows,
        };
      } else if (action.payload.pathname.startsWith('/sector')) {
        const rows = Math.min(state.rows || 0, 20);
        const columns = Math.min(state.columns || 0, 20);
        let sectorGen = {};
        if (!state.systems) {
          sectorGen = sectorGenerator({ seed: state.seed, columns, rows });
        }
        return {
          ...state,
          renderSector: true,
          columns,
          rows,
          ...sectorGen,
        };
      }
      return {
        ...state,
        columns: defaultColumns,
        rows: defaultRows,
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
