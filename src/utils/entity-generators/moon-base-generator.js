import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/moon-base/occupation';
import Situation from 'constants/moon-base/situation';

export const generateMoonBase = ({
  sector,
  parent,
  parentEntity,
  name = generateStationName(),
  generate = true,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a moon base');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a moon base',
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
  const numMoonBases = chance.weighted([0, 1], [3, 2]);
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
