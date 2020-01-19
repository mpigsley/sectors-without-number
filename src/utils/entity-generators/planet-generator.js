import Chance from 'chance';

import { zipObject } from 'constants/lodash';
import { generateName, generateRandomTags } from 'utils/name-generator';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';
import Entities from 'constants/entities';

export const generatePlanet = ({
  sector,
  parent,
  parentEntity,
  name = generateName(),
  generate = true,
  isHidden,
  hideTags = false,
  useCustomTags = true,
  customTags,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a planet');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent id and type must be defined to generate a planet');
  }

  const chance = new Chance();
  let planet = { name, parent, parentEntity, sector };
  if (isHidden !== undefined) {
    planet = { ...planet, isHidden };
  }
  if (generate) {
    const tags = generateRandomTags({
      entityType: Entities.planet.key,
      customTags: useCustomTags ? customTags : {},
    });
    if (hideTags) {
      planet.visibility = zipObject(
        tags.map(tag => `tag.${tag}`),
        tags.map(() => false),
      );
    }
    planet = {
      ...planet,
      attributes: {
        tags,
        techLevel: `TL${chance.weighted(
          ['0', '1', '2', '3', '4', '4+', '5'],
          [1, 2, 7, 7, 16, 2, 1],
        )}`,
        atmosphere: chance.weighted(Object.keys(Atmosphere.attributes), [
          1,
          2,
          3,
          24,
          3,
          2,
          1,
        ]),
        temperature: chance.weighted(Object.keys(Temperature.attributes), [
          1,
          2,
          7,
          16,
          7,
          2,
          1,
        ]),
        biosphere: chance.weighted(Object.keys(Biosphere.attributes), [
          1,
          2,
          7,
          16,
          7,
          2,
          1,
        ]),
        population: chance.weighted(Object.keys(Population.attributes), [
          1,
          2,
          7,
          16,
          7,
          2,
          1,
        ]),
      },
    };
  }

  return planet;
};

export const generatePlanets = config => {
  if (!config.sector) {
    throw new Error('Sector id must be defined to generate planets');
  }
  if (!config.parent || !config.parentEntity) {
    throw new Error('Parent must be defined to generate planets');
  }

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
      generatePlanet({
        ...config,
        name,
        generate,
      }),
    ),
  };
};
