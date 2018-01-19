import Chance from 'chance';

import { generateMineName } from 'utils/name-generator';

export const generateGasGiantMine = ({
  sector,
  parent,
  parentEntity,
  name = generateMineName(),
  generate = true,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a gas giant mine');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a gas giant mine',
    );
  }

  const gasGiantMine = { name, parent, parentEntity, sector };
  if (generate) {
    // TODO
  }

  return gasGiantMine;
};

export const generateGasGiantMines = ({
  sector,
  parent,
  parentEntity,
  children = [...Array(new Chance().weighted([0, 1, 2], [5, 2, 1]))],
  additionalPointsOfInterest,
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
      }),
    ),
  };
};
