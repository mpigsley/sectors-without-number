import Chance from 'chance';
import { xor } from 'lodash';

import { generateDeepSpaceStationName } from 'utils/name-generator';

export const generateDeepSpaceStation = ({
  sector,
  x,
  y,
  name = generateDeepSpaceStationName(),
  parent,
  parentEntity,
} = {}) => {
  if (!sector) {
    throw new Error(
      'Sector id must be defined to generate a deep space station',
    );
  }
  if (!x || !y) {
    throw new Error(
      'Sector coordinate must be provided to generate a deep space station',
    );
  }

  return { x, y, name, sector, parent, parentEntity };
};

export const generateDeepSpaceStations = ({
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
    throw new Error(
      'Sector id must be defined to generate deep space stations',
    );
  }

  const chance = new Chance();
  const numHexes = rows * columns;
  const deepSpaceStationNum =
    chance.integer({ min: 0, max: Math.floor(numHexes / 60) }) +
    Math.floor(numHexes / 45);
  const chosenCoordinates = chance.pickset(coordinates, deepSpaceStationNum);

  return {
    coordinates: xor(coordinates, chosenCoordinates),
    children: chosenCoordinates.map(coordinate =>
      generateDeepSpaceStation({ sector, ...coordinate, parent, parentEntity }),
    ),
  };
};
