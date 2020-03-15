import Chance from 'chance';

import Occupation from 'constants/moon-base/occupation';
import Situation from 'constants/moon-base/situation';
import Entities from 'constants/entities';
import commonGenerator from './common-generator';

export const generateMoonBase = commonGenerator(
  (entity, { hideOccAndSit = false, generate = true }) => {
    if (!generate) {
      return entity;
    }
    let visibility = {};
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
        ...entity.visibility,
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

export const generateMoonBases = ({
  children = [...Array(new Chance().weighted([0, 1], [5, 2]))],
  additionalPointsOfInterest = true,
  ...config
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  return {
    children: children.map(({ name, generate } = {}) =>
      generateMoonBase(Entities.gasGiantMine.key, {
        name,
        generate,
        ...config,
      }),
    ),
  };
};
