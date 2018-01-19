import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';

export const generateMoonBase = ({ sector, parent, parentEntity } = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a moon base');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a moon base',
    );
  }

  return { name: generateStationName(), parent, parentEntity, sector };
};

export const generateMoonBases = ({
  sector,
  parent,
  parentEntity,
  additionalPointsOfInterest,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate moon bases');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate moon bases');
  }

  const chance = new Chance();
  const numMoonBases = chance.weighted([1, 2, 3], [5, 3, 2]);
  return {
    children: [...Array(numMoonBases)].map(() =>
      generateMoonBase({
        sector,
        parent,
        parentEntity,
      }),
    ),
  };
};
