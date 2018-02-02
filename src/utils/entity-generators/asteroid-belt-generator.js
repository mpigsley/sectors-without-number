import Chance from 'chance';

import { generateAsteroidBeltName } from 'utils/name-generator';
import Occupation from 'constants/asteroid-belt/occupation';
import Situation from 'constants/asteroid-belt/situation';

export const generateAsteroidBelt = ({
  sector,
  name = generateAsteroidBeltName(),
  parent,
  parentEntity,
  generate = true,
} = {}) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate an asteroid belt');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate an asteroid belt');
  }

  const chance = new Chance();
  let asteroidBelt = { name, sector, parent, parentEntity };
  if (generate) {
    asteroidBelt = {
      ...asteroidBelt,
      attributes: {
        occupation: chance.pickone(Object.keys(Occupation.attributes)),
        situation: chance.pickone(Object.keys(Situation.attributes)),
      },
    };
  }
  return asteroidBelt;
};

export const generateAsteroidBelts = ({
  sector,
  parent,
  parentEntity,
  children = [...Array(new Chance().weighted([0, 1], [5, 1]))],
  additionalPointsOfInterest,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate asteroid belts');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate asteroid belts');
  }

  return {
    children: children.map(({ name, generate } = {}) =>
      generateAsteroidBelt({
        sector,
        parent,
        parentEntity,
        name,
        generate,
      }),
    ),
  };
};
