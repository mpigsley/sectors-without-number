import Chance from 'chance';

import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';
import Entities from 'constants/entities';
import commonGenerator from './common-generator';

export const generatePlanet = commonGenerator((entity, { generate = true }) => {
  if (!generate) {
    return entity;
  }
  const chance = new Chance();
  return {
    ...entity,
    attributes: {
      ...entity.attributes,
      techLevel: `TL${chance.weighted(
        ['0', '1', '2', '3', '4', '4+', '5'],
        [1, 2, 7, 7, 16, 2, 1],
      )}`,
      atmosphere: chance.weighted(
        Object.keys(Atmosphere.attributes),
        [1, 2, 3, 24, 3, 2, 1],
      ),
      temperature: chance.weighted(
        Object.keys(Temperature.attributes),
        [1, 2, 7, 16, 7, 2, 1],
      ),
      biosphere: chance.weighted(
        Object.keys(Biosphere.attributes),
        [1, 2, 7, 16, 7, 2, 1],
      ),
      population: chance.weighted(
        Object.keys(Population.attributes),
        [1, 2, 7, 16, 7, 2, 1],
      ),
    },
  };
});

export const generatePlanets = (config) => {
  let numChildren = config.children;
  if (!numChildren) {
    const chance = new Chance();
    if (config.parentEntity === Entities.blackHole.key) {
      numChildren = [...Array(chance.weighted([0, 1], [15, 1]))];
    } else {
      numChildren = [...Array(chance.weighted([1, 2, 3], [8, 3, 2]))];
    }
  }
  return {
    children: numChildren.map(({ name, generate } = {}) =>
      generatePlanet(Entities.planet.key, {
        name,
        generate,
        ...config,
      }),
    ),
  };
};
