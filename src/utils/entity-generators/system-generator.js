import Chance from 'chance';

import { xor } from 'constants/lodash';
import Entities from 'constants/entities';
import commonGenerator from './common-generator';

export const generateSystem = commonGenerator((entity, { x, y }) => {
  if (!x || !y) {
    throw new Error('Sector coordinate must be provided to generate a system');
  }
  return { x, y, ...entity };
});

export const generateSystems = ({
  additionalPointsOfInterest = true,
  ...config
}) => {
  const chance = new Chance();
  const numHexes = config.rows * config.columns;
  const apoiModifier = additionalPointsOfInterest ? 10 : 4;
  const systemNum =
    chance.integer({ min: 0, max: Math.floor(numHexes / apoiModifier) }) +
    Math.floor(numHexes / 5);
  const chosenCoordinates = chance.pickset(config.coordinates, systemNum);

  return {
    coordinates: xor(config.coordinates, chosenCoordinates),
    children: chosenCoordinates.map((coordinate) =>
      generateSystem(Entities.system.key, { ...coordinate, ...config }),
    ),
  };
};
