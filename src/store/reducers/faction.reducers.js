import { LOCATION_CHANGE } from 'connected-react-router';

import { FETCHED_SECTOR, INITIALIZED } from 'store/actions/combined.actions';
import {
  CREATED,
  EDITED,
  DELETED,
  UPDATED_FORM,
  UPDATED_ASSET_FORM,
  CREATED_BLANK_ASSET,
} from 'store/actions/faction.actions';

import { omit } from 'constants/lodash';

const initialAsset = () => ({
  type: undefined,
  hitPoints: 0,
  location: undefined,
  stealthed: false,
});

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
  assets: {},
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
    case CREATED:
    case EDITED:
      return {
        ...state,
        form: initialForm(),
        models: {
          ...state.models,
          [action.sectorId]: {
            ...(state.models[action.sectorId] || {}),
            [action.factionId]: {
              ...((state.models[action.sectorId] || {})[action.factionId] ||
                {}),
              ...action.faction,
            },
          },
        },
      };
    case DELETED:
      return {
        ...state,
        form: initialForm(),
        models: {
          ...state.models,
          [action.sectorId]: omit(
            state.models[action.sectorId] || {},
            action.factionId,
          ),
        },
      };
    case UPDATED_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.update,
        },
      };
    case UPDATED_ASSET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          assets: {
            ...state.form.assets,
            [action.key]: {
              ...state.form.assets[action.key],
              ...action.update,
            },
          },
        },
      };
    case CREATED_BLANK_ASSET:
      return {
        ...state,
        form: {
          ...state.form,
          assets: {
            ...state.form.assets,
            [action.key]: initialAsset(),
          },
        },
      };
    default:
      return state;
  }
}
