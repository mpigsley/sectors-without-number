import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';

export const generateOrbitalRuin = ({
  sector,
  parent,
  parentEntity,
  name = generateStationName(),
  generate = true,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a orbital ruin');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a orbital ruin',
    );
  }

  const orbitalRuin = { name, parent, parentEntity, sector };
  if (generate) {
    // TODO
  }

  return orbitalRuin;
};

export const generateOrbitalRuins = ({
  sector,
  parent,
  parentEntity,
  children = [...Array(new Chance().weighted([1, 2, 3], [5, 3, 2]))],
  additionalPointsOfInterest,
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
      }),
    ),
  };
};
