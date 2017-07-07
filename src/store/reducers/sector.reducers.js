import Chance from 'chance';
import QueryString from 'query-string';

import { LOCATION_CHANGE } from 'react-router-redux';
import { UPDATE_SECTOR } from '../actions/sector.actions';
import sectorGenerator from '../../utils/sector-generator';

const defaultColumns = 8;
const defaultRows = 10;
const query = QueryString.parse(window.location.search);
const initialState = {
  seed: query.s || new Chance().hash({ length: 15 }),
  renderSector: false,
  columns: query.c ? Number.parseInt(query.c, 10) : defaultColumns,
  rows: query.r ? Number.parseInt(query.r, 10) : defaultRows,
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SECTOR:
      return {
        ...state,
        [action.key]: action.value,
      };
    case LOCATION_CHANGE:
      if (action.payload.pathname === '/sector') {
        const { seed, columns, rows } = state;
        return {
          ...state,
          renderSector: true,
          columns: columns || 0,
          rows: rows || 0,
          ...sectorGenerator({ seed, columns, rows }),
        };
      }
      return {
        ...state,
        columns: defaultColumns,
        rows: defaultRows,
        renderSector: false,
      };
    default:
      return state;
  }
}
