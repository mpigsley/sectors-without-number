import Chance from 'chance';
import { includes } from 'lodash';

import { generateBlackHoleName } from 'utils/name-generator';

export const generateBlackHole = ({
  sector,
  x,
  y,
  name = generateBlackHoleName(),
  parent,
  parentEntity,
} = {}) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate a black hole');
  }
  if (!x || !y) {
    throw new Error(
      'Sector coordinate must be provided to generate a black hole',
    );
  }

  return { x, y, name, sector, parent, parentEntity };
};

export const generateBlackHoles = ({
  sector,
  parent,
  parentEntity,
  rows,
  columns,
  coordinates,
  additionalPointsOfInterest,
}) => {
  if (!additionalPointsOfInterest) {
    return [];
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate systems');
  }

  const chance = new Chance();
  const numHexes = rows * columns;
  const blackHoleNum =
    chance.integer({ min: 0, max: Math.floor(numHexes / 60) }) +
    Math.floor(numHexes / 45);
  const chosenCoordinates = chance.pickset(coordinates, blackHoleNum);

  return {
    coordinates: coordinates.filter(
      coord => !includes(chosenCoordinates, coord),
    ),
    children: chosenCoordinates.map(coordinate =>
      generateBlackHole({ sector, ...coordinate, parent, parentEntity }),
    ),
  };
};
