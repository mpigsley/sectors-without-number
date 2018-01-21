import Chance from 'chance';
import { xor } from 'lodash';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/deep-space-station/occupation';
import Situation from 'constants/deep-space-station/situation';

export const generateDeepSpaceStation = ({
  sector,
  x,
  y,
  name = generateStationName(),
  parent,
  parentEntity,
  generate = true,
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
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate a deep space station');
  }

  const chance = new Chance();
  let station = { x, y, name, sector, parent, parentEntity };
  if (generate) {
    station = {
      ...station,
      attributes: {
        occupation: chance.pickone(Object.keys(Occupation.attributes)),
        situation: chance.pickone(Object.keys(Situation.attributes)),
      },
    };
  }
  return station;
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
    return { children: [] };
  }
  if (!sector) {
    throw new Error(
      'Sector id must be defined to generate deep space stations',
    );
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate deep space stations');
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
