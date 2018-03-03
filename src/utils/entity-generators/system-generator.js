import Chance from 'chance';
import { xor } from 'lodash';

import { generateName } from 'utils/name-generator';

export const generateSystem = ({
  sector,
  x,
  y,
  name = generateName(),
  parent,
  parentEntity,
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate a system');
  }
  if (!x || !y) {
    throw new Error('Sector coordinate must be provided to generate a system');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate system');
  }

  let system = { x, y, name, sector, parent, parentEntity };
  if (isHidden !== undefined) {
    system = { ...system, isHidden };
  }
  return system;
};

export const generateSystems = ({
  sector,
  parent,
  parentEntity,
  rows,
  columns,
  coordinates,
  additionalPointsOfInterest,
}) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate systems');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate systems');
  }

  const chance = new Chance();
  const numHexes = rows * columns;
  const apoiModifier = additionalPointsOfInterest ? 10 : 4;
  const systemNum =
    chance.integer({ min: 0, max: Math.floor(numHexes / apoiModifier) }) +
    Math.floor(numHexes / 5);
  const chosenCoordinates = chance.pickset(coordinates, systemNum);

  return {
    coordinates: xor(coordinates, chosenCoordinates),
    children: chosenCoordinates.map(coordinate =>
      generateSystem({ sector, ...coordinate, parent, parentEntity }),
    ),
  };
};
