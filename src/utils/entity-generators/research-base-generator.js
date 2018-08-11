import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/research-base/occupation';
import Situation from 'constants/research-base/situation';

const chance = new Chance();
export const generateOccupation = () => chance.pickone(Object.keys(Occupation.attributes));
export const generateSituation = () => chance.pickone(Object.keys(Situation.attributes));

export const generateResearchBase = ({
  sector,
  parent,
  parentEntity,
  name = generateStationName(),
  hideOccAndSit = false,
  generate = true,
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a research base');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a research base',
    );
  }

  let researchBase = { name, parent, parentEntity, sector };
  if (isHidden !== undefined) {
    researchBase = { ...researchBase, isHidden };
  }
  if (generate) {
    if (hideOccAndSit) {
      researchBase.visibility = {
        'attr.occupation': false,
        'attr.situation': false,
      };
    }
    researchBase = {
      ...researchBase,
      attributes: {
        occupation: generateOccupation(),
        situation: generateSituation(),
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
  hideOccAndSit,
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
        hideOccAndSit,
      }),
    ),
  };
};
