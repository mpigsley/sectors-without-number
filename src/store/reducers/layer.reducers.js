import { FETCHED_SECTOR, INITIALIZED } from 'store/actions/combined.actions';

export const initialState = {
  routes: {},
  syncLock: false,
};

export default function layer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
    case FETCHED_SECTOR:
      return {
        ...state,
        layers: {
          ...state.layers,
          [action.sectorId]: action.layers,
        },
      };
    default:
      return state;
  }
}
