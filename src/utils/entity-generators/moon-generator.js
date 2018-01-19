import Chance from 'chance';

import { generateName } from 'utils/name-generator';

export const generateMoon = ({ sector, parent, parentEntity } = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a moon');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent id and type must be defined to generate a moon');
  }

  return { name: generateName(), parent, parentEntity, sector };
};

export const generateMoons = ({
  sector,
  parent,
  parentEntity,
  additionalPointsOfInterest,
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

  const chance = new Chance();
  const numMoons = chance.weighted([0, 1, 2, 3], [5, 3, 2, 1]);
  return {
    children: [...Array(numMoons)].map(() =>
      generateMoon({
        sector,
        parent,
        parentEntity,
      }),
    ),
  };
};
