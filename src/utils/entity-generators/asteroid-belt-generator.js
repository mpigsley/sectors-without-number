import Chance from 'chance';

import Occupation from 'constants/asteroid-belt/occupation';
import Situation from 'constants/asteroid-belt/situation';
import Entities from 'constants/entities';
import commonGenerator from './common-generator';

export const generateAsteroidBelt = commonGenerator(
  (entity, { hideOccAndSit = false, generate = true }) => {
    if (!generate) {
      return entity;
    }
    let visibility;
    if (hideOccAndSit) {
      visibility = {
        'attr.occupation': false,
        'attr.situation': false,
      };
    }
    const chance = new Chance();
    return {
      ...entity,
      visibility: {
        ...entity.visiblity,
        ...visibility,
      },
      attributes: {
        ...entity.attributes,
        occupation: chance.pickone(Object.keys(Occupation.attributes)),
        situation: chance.pickone(Object.keys(Situation.attributes)),
      },
    };
  },
);

export const generateAsteroidBelts = ({
  children = [...Array(new Chance().weighted([0, 1], [4, 1]))],
  additionalPointsOfInterest = true,
  ...config
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  return {
    children: children.map(({ name, generate } = {}) =>
      generateAsteroidBelt(Entities.asteroidBelt.key, {
        name,
        generate,
        ...config,
      }),
    ),
  };
};
