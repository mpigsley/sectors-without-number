import { mapValues, omit, omitBy, isNil, isObject, size } from 'lodash';

import {
  UPDATE_ENTITIES,
  UPDATE_ENTITY,
  DELETE_ENTITIES,
} from 'store/actions/entity.actions';

const initialState = {
  asteroidBase: {},
  asteroidBelt: {},
  blackHole: {},
  deepSpaceStation: {},
  gasGiantMine: {},
  moon: {},
  moonBase: {},
  orbitalRuin: {},
  planet: {},
  refuelingStation: {},
  researchBase: {},
  sector: {},
  spaceStation: {},
  system: {},
};

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
                const tags =
                  thisEntity.attributes && thisEntity.attributes.tags
                    ? thisEntity.attributes.tags.filter(tag => tag)
                    : null;
                return omitBy(
                  {
                    ...(state[entityType][entityId] || {}),
                    ...omit(thisEntity, blacklistedAttributes),
                    attributes: omitBy(
                      { ...thisEntity.attributes, tags },
                      isNil,
                    ),
                  },
                  obj => isNil(obj) || (isObject(obj) && !size(obj)),
                );
              }),
            },
            isNil,
          ),
        ),
      };
    case UPDATE_ENTITY:
      return {
        ...state,
        [action.entityType]: {
          ...state[action.entityType],
          [action.entityId]: action.update,
        },
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
