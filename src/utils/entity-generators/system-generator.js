import Chance from 'chance';

import { allSectorCoordinates } from 'utils/common';
import { generateName } from 'utils/name-generator';

export const generateSystem = (
  config,
  { sector, coordinate, name = generateName() } = {},
) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate a system');
  }
  if (!coordinate) {
    throw new Error('Sector coordinate must be provided to generate a system');
  }

  return { ...coordinate, name, sector };
};

export const generateSystems = (config, { sector }) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate systems');
  }

  const chance = new Chance();
  const numHexes = config.rows * config.columns;
  const systemNum =
    chance.integer({ min: 0, max: Math.floor(numHexes / 8) }) +
    Math.floor(numHexes / 4);

  return chance
    .pickset(allSectorCoordinates(config.columns, config.rows), systemNum)
    .map(coordinate => generateSystem(config, { sector, coordinate }));
};
