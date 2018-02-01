import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/research-base/occupation';
import Situation from 'constants/research-base/situation';

export const generateResearchBase = ({
  sector,
  parent,
  parentEntity,
  name = generateStationName(),
  generate = true,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a research base');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a research base',
    );
  }

  const chance = new Chance();
  let researchBase = { name, parent, parentEntity, sector };
  if (generate) {
    researchBase = {
      ...researchBase,
      attributes: {
        occupation: chance.pickone(Object.keys(Occupation.attributes)),
        situation: chance.pickone(Object.keys(Situation.attributes)),
      },
    };
  }
  return researchBase;
};

export const generateResearchBases = ({
  sector,
  parent,
  parentEntity,
  additionalPointsOfInterest,
  children = [...Array(new Chance().weighted([0, 1], [3, 1]))],
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

  return {
    children: children.map(({ name, generate } = {}) =>
      generateResearchBase({
        name,
        generate,
        sector,
        parent,
        parentEntity,
      }),
    ),
  };
};
