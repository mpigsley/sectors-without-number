import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';

export const generateSpaceStation = ({ sector, parent, parentEntity } = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a space station');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a space station',
    );
  }

  return { name: generateStationName(), parent, parentEntity, sector };
};

export const generateSpaceStations = ({
  sector,
  parent,
  parentEntity,
  additionalPointsOfInterest,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate space stations');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate space stations');
  }

  const chance = new Chance();
  const numSpaceStations = chance.weighted([0, 1, 2], [3, 1, 1]);
  return {
    children: [...Array(numSpaceStations)].map(() =>
      generateSpaceStation({
        sector,
        parent,
        parentEntity,
      }),
    ),
  };
};
