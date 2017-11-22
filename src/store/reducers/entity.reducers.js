import { UPDATE_ENTITIES, UPDATE_ENTITY } from 'store/actions/entity.actions';

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

export default function entity(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ENTITIES:
      return {
        ...state,
        ...action.entities,
      };
    case UPDATE_ENTITY:
      return {
        ...state,
        [action.entityType]: {
          ...state[action.entityType],
          [action.entityId]: action.update,
        },
      };
    default:
      return state;
  }
}
