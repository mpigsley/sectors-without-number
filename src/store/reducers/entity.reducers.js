import { ADD_ENTITIES } from 'store/actions/entity.actions';

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
    case ADD_ENTITIES:
      return {
        ...state,
        ...action.entities,
      };
    default:
      return state;
  }
}
