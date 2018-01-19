import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';

export const generateResearchBase = ({ sector, parent, parentEntity } = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a research base');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a research base',
    );
  }

  return { name: generateStationName(), parent, parentEntity, sector };
};

export const generateResearchBases = ({
  sector,
  parent,
  parentEntity,
  additionalPointsOfInterest,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate research bases');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate research bases');
  }

  const chance = new Chance();
  const numResearchBases = chance.weighted([0, 1], [3, 1]);
  return {
    children: [...Array(numResearchBases)].map(() =>
      generateResearchBase({
        sector,
        parent,
        parentEntity,
      }),
    ),
  };
};
