import Entities from 'constants/entities';

import generateSector from './sector-generator';
import { generateSystems, generateSystem } from './system-generator';
import { generatePlanets, generatePlanet } from './planet-generator';
import { generateBlackHoles, generateBlackHole } from './black-hole-generator';

export default {
  [Entities.asteroidBase.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.asteroidBelt.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.blackHole.key]: {
    generateOne: generateBlackHole,
    generateAll: generateBlackHoles,
  },
  [Entities.deepSpaceStation.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.gasGiantMine.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.moon.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.moonBase.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.orbitalRuin.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.planet.key]: {
    generateOne: generatePlanet,
    generateAll: generatePlanets,
  },
  [Entities.refuelingStation.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.researchBase.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.sector.key]: {
    generateOne: generateSector,
    generateAll: () => ({ children: [] }),
  },
  [Entities.spaceStation.key]: {
    generateOne: () => ({}),
    generateAll: () => ({ children: [] }),
  },
  [Entities.system.key]: {
    generateOne: generateSystem,
    generateAll: generateSystems,
  },
};
