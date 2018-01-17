import Entities from 'constants/entities';

import generateSector from './sector-generator';
import { generateSystems, generateSystem } from './system-generator';
import { generatePlanets, generatePlanet } from './planet-generator';

export default {
  [Entities.asteroidBase.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.asteroidBelt.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.blackHole.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.deepSpaceStation.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.gasGiantMine.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.moon.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.moonBase.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.orbitalRuin.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.planet.key]: {
    generateOne: generatePlanet,
    generateAll: generatePlanets,
  },
  [Entities.refuelingStation.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.researchBase.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.sector.key]: {
    generateOne: generateSector,
    generateAll: () => [],
  },
  [Entities.spaceStation.key]: {
    generateOne: () => ({}),
    generateAll: () => [],
  },
  [Entities.system.key]: {
    generateOne: generateSystem,
    generateAll: generateSystems,
  },
};
