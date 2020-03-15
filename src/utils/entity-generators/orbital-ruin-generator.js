import Chance from 'chance';

import Occupation from 'constants/orbital-ruin/occupation';
import Situation from 'constants/orbital-ruin/situation';
import Entities from 'constants/entities';
import commonGenerator from './common-generator';

export const generateOrbitalRuin = commonGenerator(
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

export const generateOrbitalRuins = ({
  children = [...Array(new Chance().weighted([0, 1], [3, 1]))],
  additionalPointsOfInterest = true,
  ...config
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  return {
    children: children.map(({ name, generate } = {}) =>
      generateOrbitalRuin(Entities.orbitalRuin.key, {
        name,
        generate,
        ...config,
      }),
    ),
  };
};
