import {
  generateName,
  generateSectorName,
  generateBlackHoleName,
} from 'utils/name-generator';
import WorldTags from 'constants/world-tags';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';
import TechLevel from 'constants/tech-level';

const researchBase = {
  key: 'researchBase',
  name: 'Research Base',
  topLevel: false,
  isAdditional: true,
  children: [],
};

const refuelingStation = {
  key: 'refuelingStation',
  name: 'Refueling Station',
  topLevel: false,
  isAdditional: true,
  children: [],
};

const moonBase = {
  key: 'moonBase',
  name: 'Moon Base',
  topLevel: false,
  isAdditional: true,
  children: [],
};

const orbitalRuin = {
  key: 'orbitalRuin',
  name: 'Orbital Ruin',
  topLevel: false,
  isAdditional: true,
  children: [],
};

const gasGiantMine = {
  key: 'gasGiantMine',
  name: 'Gas Giant Mine',
  topLevel: false,
  isAdditional: true,
  children: [],
};

const spaceStation = {
  key: 'spaceStation',
  name: 'Space Station',
  topLevel: false,
  isAdditional: true,
  children: [],
};

const asteroidBase = {
  key: 'asteroidBase',
  name: 'Asteroid Base',
  topLevel: false,
  isAdditional: true,
  children: [],
};

const moon = {
  key: 'moon',
  name: 'Moon',
  topLevel: false,
  isAdditional: true,
  children: [
    moonBase.key,
    researchBase.key,
    refuelingStation.key,
    orbitalRuin.key,
  ],
};

const planet = {
  key: 'planet',
  name: 'Planet',
  topLevel: false,
  isAdditional: false,
  tags: WorldTags,
  nameGenerator: generateName,
  attributes: [Atmosphere, Temperature, Biosphere, Population, TechLevel],
  children: [moon.key, orbitalRuin.key, researchBase.key, refuelingStation.key],
};

const blackHole = {
  key: 'blackHole',
  name: 'Black Hole',
  topLevel: true,
  isAdditional: true,
  nameGenerator: generateBlackHoleName,
  children: [
    spaceStation.key,
    refuelingStation.key,
    researchBase.key,
    orbitalRuin.key,
  ],
};

const asteroidBelt = {
  key: 'asteroidBelt',
  name: 'Asteroid Belt',
  topLevel: true,
  isAdditional: true,
  children: [asteroidBase.key, refuelingStation.key, researchBase.key],
};

const deepSpaceStation = {
  key: 'deepSpaceStation',
  name: 'Deep-Space Station',
  topLevel: true,
  isAdditional: true,
  children: [],
};

const system = {
  key: 'system',
  name: 'System',
  topLevel: true,
  isAdditional: false,
  nameGenerator: generateName,
  children: [
    planet.key,
    refuelingStation.key,
    spaceStation.key,
    researchBase.key,
  ],
};

const sector = {
  key: 'sector',
  name: 'Sector',
  topLevel: false,
  isAdditional: false,
  nameGenerator: generateSectorName,
  children: [system.key, deepSpaceStation.key, asteroidBelt.key, blackHole.key],
};

export default {
  asteroidBase,
  asteroidBelt,
  blackHole,
  deepSpaceStation,
  gasGiantMine,
  moon,
  moonBase,
  orbitalRuin,
  planet,
  refuelingStation,
  researchBase,
  sector,
  spaceStation,
  system,
};
