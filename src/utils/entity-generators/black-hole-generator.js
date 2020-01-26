import Chance from 'chance';

import { xor } from 'constants/lodash';
import Entities from 'constants/entities';
import commonGenerator from './common-generator';

export const generateBlackHole = commonGenerator((entity, { x, y }) => {
  if (!x || !y) {
    throw new Error(
      'Sector coordinate must be provided to generate a black hole',
    );
  }
  return { x, y, ...entity };
});

export const generateBlackHoles = ({
  additionalPointsOfInterest = true,
  ...config
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }

  const chance = new Chance();
  const numHexes = config.rows * config.columns;
  const blackHoleNum =
    chance.integer({ min: 1, max: Math.max(1, Math.floor(numHexes / 40)) }) +
    Math.floor(numHexes / 45);
  const chosenCoordinates = chance.pickset(config.coordinates, blackHoleNum);

  return {
    coordinates: xor(config.coordinates, chosenCoordinates),
    children: chosenCoordinates.map(coordinate =>
      generateBlackHole(Entities.blackHole.key, { ...coordinate, ...config }),
    ),
  };
};
