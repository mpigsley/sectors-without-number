import { mapValues, omit } from 'lodash';

import Entities from 'constants/entities';
import { UPDATE_ENTITIES, DELETE_ENTITIES } from 'store/actions/entity.actions';
import { mergeEntityUpdates } from 'utils/entity';

const initialState = mapValues(Entities, () => ({}));

export default function entity(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ENTITIES:
      return mergeEntityUpdates(state, action.entities);
    case DELETE_ENTITIES:
      return {
        ...state,
        ...mapValues(action.entities, (entityIds, entityType) =>
          omit(state[entityType], entityIds),
        ),
      };
    default:
      return state;
  }
}
