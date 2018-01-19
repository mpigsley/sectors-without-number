import Chance from 'chance';
import { xor } from 'lodash';

import { generateAsteroidBeltName } from 'utils/name-generator';

export const generateAsteroidBelt = ({
  sector,
  x,
  y,
  name = generateAsteroidBeltName(),
  parent,
  parentEntity,
} = {}) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate an asteroid belt');
  }
  if (!x || !y) {
    throw new Error(
      'Sector coordinate must be provided to generate an asteroid belt',
    );
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate an asteroid belt');
  }

  return { x, y, name, sector, parent, parentEntity };
};

export const generateAsteroidBelts = ({
  sector,
  parent,
  parentEntity,
  rows,
  columns,
  coordinates,
  additionalPointsOfInterest,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate asteroid belts');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate asteroid belts');
  }

  const chance = new Chance();
  const numHexes = rows * columns;
  const asteroidBeltNum =
    chance.integer({ min: 0, max: Math.floor(numHexes / 60) }) +
    Math.floor(numHexes / 45);
  const chosenCoordinates = chance.pickset(coordinates, asteroidBeltNum);

  return {
    coordinates: xor(coordinates, chosenCoordinates),
    children: chosenCoordinates.map(coordinate =>
      generateAsteroidBelt({ sector, ...coordinate, parent, parentEntity }),
    ),
  };
};
