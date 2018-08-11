import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/moon-base/occupation';
import Situation from 'constants/moon-base/situation';

const chance = new Chance();
export const generateOccupation = () => chance.pickone(Object.keys(Occupation.attributes));
export const generateSituation = () => chance.pickone(Object.keys(Situation.attributes));

export const generateMoonBase = ({
  sector,
  parent,
  parentEntity,
  name = generateStationName(),
  hideOccAndSit = false,
  generate = true,
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a moon base');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a moon base',
    );
  }

  let asteroidBase = { name, parent, parentEntity, sector };
  if (isHidden !== undefined) {
    asteroidBase = { ...asteroidBase, isHidden };
  }
  if (generate) {
    if (hideOccAndSit) {
      asteroidBase.visibility = {
        'attr.occupation': false,
        'attr.situation': false,
      };
    }
    asteroidBase = {
      ...asteroidBase,
      attributes: {
        occupation: generateOccupation(),
        situation: generateSituation(),
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
  children = [...Array(new Chance().weighted([0, 1], [5, 2]))],
  hideOccAndSit,
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

  return {
    children: children.map(() =>
      generateMoonBase({
        sector,
        parent,
        parentEntity,
        hideOccAndSit,
      }),
    ),
  };
};
