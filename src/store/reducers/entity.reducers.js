import { LOCATION_CHANGE } from 'react-router-redux';
import { uniq, mapValues, mapKeys, omit, keys } from 'lodash';

import Entities from 'constants/entities';
import {
  UPDATE_ENTITIES,
  DELETE_ENTITIES,
  UPDATE_ID_MAPPING,
} from 'store/actions/entity.actions';
import { INITIALIZE, LOGGED_IN, LOGGED_OUT } from 'store/actions/user.actions';
import { mergeEntityUpdates } from 'utils/entity';

const initialState = {
  models: mapValues(Entities, () => ({})),
  saved: [],
  share: null,
  currentSector: null,
  currentEntityType: null,
  currentEntity: null,
};

export default function entity(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        models: mergeEntityUpdates(state.models, action.entities),
        saved: action.saved,
        share: action.share,
      };
    case UPDATE_ENTITIES:
      return {
        ...state,
        models: mergeEntityUpdates(state.models, action.entities),
        saved: uniq([...state.saved, state.currentSector]).filter(s => s),
      };
    case LOGGED_IN:
      return {
        ...state,
        models: mergeEntityUpdates(initialState.models, action.entities),
        saved: keys(action.entities[Entities.sector.key] || {}),
        share: null,
      };
    case LOCATION_CHANGE: {
      const { pathname } = action.payload;
      if (
        pathname.startsWith('/sector/') ||
        pathname.startsWith('/overview/')
      ) {
        return {
          ...state,
          currentSector: pathname.split('/')[2],
          currentEntityType: pathname.split('/')[3],
          currentEntity: pathname.split('/')[4],
        };
      }
      return {
        ...state,
        currentSector: null,
        currentEntityType: null,
        currentEntity: null,
      };
    }
    case UPDATE_ID_MAPPING:
      return {
        ...state,
        saved: state.saved.map(saveId => action.mapping[saveId] || saveId),
        models: {
          ...state.models,
          ...mapValues(state.models, entities =>
            mapValues(
              mapKeys(entities, (_, key) => action.mapping[key] || key),
              entityObj => {
                const sector =
                  action.mapping[entityObj.sector] || entityObj.sector;
                let update = { ...entityObj };
                if (sector) {
                  update = { ...update, sector };
                }
                const parent =
                  action.mapping[entityObj.parent] || entityObj.parent;
                if (parent) {
                  update = { ...update, parent };
                }
                return update;
              },
            ),
          ),
        },
      };
    case DELETE_ENTITIES: {
      const deletedSectorIds = action.entities[Entities.sector.key] || [];
      return {
        ...state,
        saved: state.saved.filter(
          saveId => deletedSectorIds.indexOf(saveId) < 0,
        ),
        models: {
          ...state.models,
          ...mapValues(action.entities, (entityIds, entityType) =>
            omit(state.models[entityType], entityIds),
          ),
        },
      };
    }
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}
