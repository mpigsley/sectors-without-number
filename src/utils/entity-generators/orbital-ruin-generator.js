import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/orbital-ruin/occupation';
import Situation from 'constants/orbital-ruin/situation';

export const generateOrbitalRuin = ({
  sector,
  parent,
  parentEntity,
  name = generateStationName(),
  hideOccAndSit = false,
  generate = true,
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a orbital ruin');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a orbital ruin',
    );
  }

  const chance = new Chance();
  let orbitalRuin = { name, parent, parentEntity, sector };
  if (isHidden !== undefined) {
    orbitalRuin = { ...orbitalRuin, isHidden };
  }
  if (generate) {
    if (hideOccAndSit) {
      orbitalRuin.visibility = {
        'attr.occupation': false,
        'attr.situation': false,
      };
    }
    orbitalRuin = {
      ...orbitalRuin,
      attributes: {
        occupation: chance.pickone(Object.keys(Occupation.attributes)),
        situation: chance.pickone(Object.keys(Situation.attributes)),
      },
    };
  }
  return orbitalRuin;
};

export const generateOrbitalRuins = ({
  sector,
  parent,
  parentEntity,
  children = [...Array(new Chance().weighted([0, 1], [3, 1]))],
  additionalPointsOfInterest,
  hideOccAndSit,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate orbital ruins');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate orbital ruins');
  }

  return {
    children: children.map(({ name, generate } = {}) =>
      generateOrbitalRuin({
        sector,
        parent,
        parentEntity,
        name,
        generate,
        hideOccAndSit,
      }),
    ),
  };
};
