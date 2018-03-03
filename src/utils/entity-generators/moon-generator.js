import Chance from 'chance';

import { generateName } from 'utils/name-generator';

export const generateMoon = ({
  sector,
  parent,
  parentEntity,
  name = generateName(),
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a moon');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent id and type must be defined to generate a moon');
  }
  return { isHidden, name, parent, parentEntity, sector };
};

export const generateMoons = ({
  sector,
  parent,
  parentEntity,
  additionalPointsOfInterest,
  children = [...Array(new Chance().weighted([0, 1, 2, 3], [20, 5, 2, 1]))],
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate moons');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate moons');
  }

  return {
    children: children.map(() =>
      generateMoon({
        sector,
        parent,
        parentEntity,
      }),
    ),
  };
};
