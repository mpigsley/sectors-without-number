import Chance from 'chance';
import { keys } from 'lodash';

import { generateName } from 'utils/name-generator';
import { worldTagKeys } from 'constants/world-tags';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';

export const generatePlanet = (
  config,
  { sector, parent, parentEntity, name = generateName(), generate = true } = {},
) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a planet');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent id and type must be defined to generate a planet');
  }

  const chance = new Chance();
  let planet = { name, parent, parentEntity, sector };
  if (generate) {
    planet = {
      ...planet,
      attributes: {
        tags: chance.pickset(keys(worldTagKeys), 2),
        techLevel: `TL${chance.weighted(
          ['0', '1', '2', '3', '4', '4+', '5'],
          [1, 1, 2, 2, 3, 1, 1],
        )}`,
        atmosphere: chance.weighted(keys(Atmosphere), [1, 1, 1, 5, 1, 1, 1]),
        temperature: chance.weighted(keys(Temperature), [1, 1, 2, 3, 2, 1, 1]),
        biosphere: chance.weighted(keys(Biosphere), [1, 1, 2, 3, 2, 1, 1]),
        population: chance.weighted(keys(Population), [1, 1, 2, 3, 2, 1, 1]),
      },
    };
  }

  return planet;
};

export const generatePlanets = (config, { sector, parent, parentEntity }) => {
  const chance = new Chance();
  const numPlanets = chance.weighted([1, 2, 3], [5, 3, 2]);

  return [...Array(numPlanets)].map(() =>
    generatePlanet(config, {
      sector,
      parent,
      parentEntity,
    }),
  );
};
