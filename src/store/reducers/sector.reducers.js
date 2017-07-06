import Chance from 'chance';

import { UPDATE_SECTOR } from '../actions/sector.actions';

const initialState = {
  seed: new Chance().hash({ length: 15 }),
  columns: 8,
  rows: 10,
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SECTOR:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}
