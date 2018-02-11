import { mapValues, mapKeys, omit } from 'lodash';

import Entities from 'constants/entities';
import {
  UPDATE_ENTITIES,
  DELETE_ENTITIES,
  UPDATE_ID_MAPPING,
} from 'store/actions/entity.actions';
import { INITIALIZE, LOGGED_IN, LOGGED_OUT } from 'store/actions/user.actions';
import { mergeEntityUpdates } from 'utils/entity';

const initialState = mapValues(Entities, () => ({}));

export default function entity(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
    case UPDATE_ENTITIES:
      return mergeEntityUpdates(state, action.entities);
    case LOGGED_IN:
      return mergeEntityUpdates(initialState, action.entities);
    case UPDATE_ID_MAPPING:
      return {
        ...state,
        ...mapValues(state, entities =>
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
      };
    case DELETE_ENTITIES:
      return {
        ...state,
        ...mapValues(action.entities, (entityIds, entityType) =>
          omit(state[entityType], entityIds),
        ),
      };
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}
