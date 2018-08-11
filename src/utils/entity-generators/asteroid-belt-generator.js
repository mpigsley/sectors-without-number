import Chance from 'chance';

import { generateAsteroidBeltName } from 'utils/name-generator';
import Occupation from 'constants/asteroid-belt/occupation';
import Situation from 'constants/asteroid-belt/situation';

const chance = new Chance();
export const generateOccupation = () => chance.pickone(Object.keys(Occupation.attributes));
export const generateSituation = () => chance.pickone(Object.keys(Situation.attributes));

export const generateAsteroidBelt = ({
  sector,
  name = generateAsteroidBeltName(),
  hideOccAndSit = false,
  parent,
  parentEntity,
  generate = true,
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate an asteroid belt');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate an asteroid belt');
  }

  let asteroidBelt = { name, sector, parent, parentEntity };
  if (isHidden !== undefined) {
    asteroidBelt = { ...asteroidBelt, isHidden };
  }
  if (generate) {
    if (hideOccAndSit) {
      asteroidBelt.visibility = {
        'attr.occupation': false,
        'attr.situation': false,
      };
    }
    asteroidBelt = {
      ...asteroidBelt,
      attributes: {
        occupation: generateOccupation(),
        situation: generateSituation(),
      },
    };
  }
  return asteroidBelt;
};

export const generateAsteroidBelts = ({
  sector,
  parent,
  parentEntity,
  children = [...Array(new Chance().weighted([0, 1], [4, 1]))],
  additionalPointsOfInterest,
  hideOccAndSit,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate asteroid belts');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate asteroid belts');
  }

  return {
    children: children.map(({ name, generate } = {}) =>
      generateAsteroidBelt({
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
