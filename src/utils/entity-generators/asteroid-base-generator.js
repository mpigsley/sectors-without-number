import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/asteroid-base/occupation';
import Situation from 'constants/asteroid-base/situation';

export const generateAsteroidBase = ({
  sector,
  parent,
  parentEntity,
  name = generateStationName(),
  generate = true,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a asteroid base');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a asteroid base',
    );
  }

  const chance = new Chance();
  let asteroidBase = { name, parent, parentEntity, sector };
  if (generate) {
    asteroidBase = {
      ...asteroidBase,
      attributes: {
        occupation: chance.pickone(Object.keys(Occupation.attributes)),
        situation: chance.pickone(Object.keys(Situation.attributes)),
      },
    };
  }
  return asteroidBase;
};

export const generateAsteroidBases = ({
  sector,
  parent,
  parentEntity,
  children = [...Array(new Chance().weighted([0, 1, 2], [1, 3, 2]))],
  additionalPointsOfInterest,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate asteroid bases');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate asteroid bases');
  }

  return {
    children: children.map(({ name, generate } = {}) =>
      generateAsteroidBase({
        sector,
        parent,
        parentEntity,
        name,
        generate,
      }),
    ),
  };
};
