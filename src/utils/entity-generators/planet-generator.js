import Chance from 'chance';

import { zipObject } from 'constants/lodash';
import { generateName } from 'utils/name-generator';
import { worldTagKeys } from 'constants/world-tags';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';
import Entities from 'constants/entities';
import TechLevel from 'constants/tech-level';

const chance = new Chance();

export const generateAtmosphere = () => chance.weighted(Object.keys(Atmosphere.attributes), [
  1,
  2,
  3,
  24,
  3,
  2,
  1,
]);

export const generateTemperature = () => chance.weighted(Object.keys(Temperature.attributes), [
  1,
  2,
  7,
  16,
  7,
  2,
  1,
]);

export const generateBiosphere = () => chance.weighted(Object.keys(Biosphere.attributes), [
  1,
  2,
  7,
  16,
  7,
  2,
  1,
]);

export const generatePopulation = () => chance.weighted(Object.keys(Population.attributes), [
  1,
  2,
  7,
  16,
  7,
  2,
  1,
]);

export const generateTechLevel = () => chance.weighted(Object.keys(TechLevel.attributes),
  [1, 2, 7, 7, 16, 2, 1],
)

export const generateTag = () => chance.pickone(Object.keys(worldTagKeys));

export const generatePlanet = ({
  sector,
  parent,
  parentEntity,
  name = generateName(),
  generate = true,
  isHidden,
  hideTags = false,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a planet');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent id and type must be defined to generate a planet');
  }

  let planet = { name, parent, parentEntity, sector };
  if (isHidden !== undefined) {
    planet = { ...planet, isHidden };
  }
  if (generate) {
    const tags = [generateTag(), generateTag()];
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
        techLevel: generateTechLevel(),
        atmosphere: generateAtmosphere(),
        temperature: generateTemperature(),
        biosphere: generateBiosphere(),
        population: generatePopulation(),
      },
    };
  }

  return planet;
};

export const generatePlanets = ({
  sector,
  parent,
  parentEntity,
  children,
  hideTags,
}) => {
  if (!sector) {
    throw new Error('Sector id must be defined to generate planets');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate planets');
  }

  let numChildren = children;
  if (!numChildren) {
    if (parentEntity === Entities.blackHole.key) {
      numChildren = [...Array(chance.weighted([0, 1], [15, 1]))];
    } else {
      numChildren = [...Array(chance.weighted([1, 2, 3], [8, 3, 2]))];
    }
  }

  return {
    children: numChildren.map(({ name, generate } = {}) =>
      generatePlanet({
        sector,
        parent,
        parentEntity,
        name,
        generate,
        hideTags,
      }),
    ),
  };
};
