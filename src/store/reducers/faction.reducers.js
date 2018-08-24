import { LOCATION_CHANGE } from 'connected-react-router';

import { FETCHED_SECTOR, INITIALIZED } from 'store/actions/combined.actions';
import { UPDATE_FORM } from 'store/actions/faction.actions';

const initialForm = () => ({
  name: '',
  description: '',
  force: 0,
  cunning: 0,
  wealth: 0,
  hitPoints: 0,
  balance: 0,
  experience: 0,
  goal: undefined,
  relationship: undefined,
  homeworld: undefined,
  tags: [],
  assets: [],
});

export const initialState = {
  models: {},
  form: initialForm(),
  isCreating: false,
};

export default function faction(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
    case FETCHED_SECTOR:
      if (!action.sectorId) {
        return state;
      }
      return {
        ...state,
        models: {
          ...state.models,
          [action.sectorId]: action.factions,
        },
      };
    case LOCATION_CHANGE: {
      const { pathname } = action.payload.location;
      const [, , sectorId, , factionId] = pathname.split('/');
      return {
        ...state,
        form: (state.models[sectorId] || {})[factionId] || initialForm(),
        isCreating: factionId === 'new',
      };
    }
    case UPDATE_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.update,
        },
      };
    default:
      return state;
  }
}
