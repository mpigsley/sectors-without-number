import Chance from 'chance';

import { generateName } from 'utils/name-generator';

export const generateAsteroidBase = ({
  sector,
  parent,
  parentEntity,
  name = generateName(),
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

  const asteroidBase = { name, parent, parentEntity, sector };
  if (generate) {
    // TODO
  }

  return asteroidBase;
};

export const generateAsteroidBases = ({
  sector,
  parent,
  parentEntity,
  children = [...Array(new Chance().weighted([1, 2, 3], [5, 3, 2]))],
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
