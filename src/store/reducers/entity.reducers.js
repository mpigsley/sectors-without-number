import { mapValues, omit, omitBy, isNil, isObject, size } from 'lodash';

import Entities from 'constants/entities';
import { UPDATE_ENTITIES, DELETE_ENTITIES } from 'store/actions/entity.actions';

const initialState = mapValues(Entities, () => ({}));

const blacklistedAttributes = ['sort', 'generate', 'isUpdated', 'isCreated'];
export default function entity(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ENTITIES:
      return {
        ...state,
        ...mapValues(action.entities, (entities, entityType) =>
          omitBy(
            {
              ...state[entityType],
              ...mapValues(entities, (thisEntity, entityId) => {
                if (!thisEntity) {
                  return null;
                }
                const existingEntity = state[entityType][entityId] || {};
                const mergedEntity = {
                  ...existingEntity,
                  ...omit(thisEntity, blacklistedAttributes),
                };
                const tags =
                  mergedEntity.attributes && mergedEntity.attributes.tags
                    ? mergedEntity.attributes.tags.filter(tag => tag)
                    : null;
                const attributes = omitBy(
                  { ...mergedEntity.attributes, tags },
                  isNil,
                );
                return omitBy(
                  { ...mergedEntity, attributes },
                  obj => isNil(obj) || (isObject(obj) && !size(obj)),
                );
              }),
            },
            isNil,
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
    default:
      return state;
  }
}
