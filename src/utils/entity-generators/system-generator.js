import Chance from 'chance';
import { includes } from 'lodash';

import { generateName } from 'utils/name-generator';

export const generateSystem = ({
  sector,
  x,
  y,
  name = generateName(),
  parent,
  parentEntity,
} = {}) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate a system');
  }
  if (!x || !y) {
    throw new Error('Sector coordinate must be provided to generate a system');
  }

  return { x, y, name, sector, parent, parentEntity };
};

export const generateSystems = ({
  sector,
  parent,
  parentEntity,
  rows,
  columns,
  coordinates,
}) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate systems');
  }

  const chance = new Chance();
  const numHexes = rows * columns;
  const systemNum =
    chance.integer({ min: 0, max: Math.floor(numHexes / 8) }) +
    Math.floor(numHexes / 5);
  const chosenCoordinates = chance.pickset(coordinates, systemNum);

  return {
    coordinates: coordinates.filter(
      coord => !includes(chosenCoordinates, coord),
    ),
    children: chosenCoordinates.map(coordinate =>
      generateSystem({ sector, ...coordinate, parent, parentEntity }),
    ),
  };
};
