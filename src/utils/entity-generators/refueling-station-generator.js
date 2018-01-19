import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';

export const generateRefuelingStation = ({
  sector,
  parent,
  parentEntity,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a refueling station');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a refueling station',
    );
  }

  return { name: generateStationName(), parent, parentEntity, sector };
};

export const generateRefuelingStations = ({
  sector,
  parent,
  parentEntity,
  additionalPointsOfInterest,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate refueling stations');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate refueling stations');
  }

  const chance = new Chance();
  const numRefuelingStations = chance.weighted([1, 2, 3], [5, 3, 2]);
  return {
    children: [...Array(numRefuelingStations)].map(() =>
      generateRefuelingStation({
        sector,
        parent,
        parentEntity,
      }),
    ),
  };
};
