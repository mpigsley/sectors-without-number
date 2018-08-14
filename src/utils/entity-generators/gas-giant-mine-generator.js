import Chance from 'chance';

import { generateMineName } from 'utils/name-generator';
import Occupation from 'constants/gas-giant-mine/occupation';
import Situation from 'constants/gas-giant-mine/situation';

export const generateGasGiantMine = ({
  sector,
  parent,
  parentEntity,
  name = generateMineName(),
  hideOccAndSit = false,
  generate = true,
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a gas giant mine');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a gas giant mine',
    );
  }

  const chance = new Chance();
  let gasGiantMine = { name, parent, parentEntity, sector };
  if (isHidden !== undefined) {
    gasGiantMine = { ...gasGiantMine, isHidden };
  }
  if (generate) {
    if (hideOccAndSit) {
      gasGiantMine.visibility = {
        'attr.occupation': false,
        'attr.situation': false,
      };
    }
    gasGiantMine = {
      ...gasGiantMine,
      attributes: {
        occupation: chance.pickone(Object.keys(Occupation.attributes)),
        situation: chance.pickone(Object.keys(Situation.attributes)),
      },
    };
  }
  return gasGiantMine;
};

export const generateGasGiantMines = ({
  sector,
  parent,
  parentEntity,
  children = [...Array(new Chance().weighted([0, 1, 2], [8, 3, 1]))],
  additionalPointsOfInterest,
  hideOccAndSit,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate gas giant mines');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate gas giant mines');
  }

  return {
    children: children.map(({ name, generate } = {}) =>
      generateGasGiantMine({
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
