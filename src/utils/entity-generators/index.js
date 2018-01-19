import Entities from 'constants/entities';

import generateSector from './sector-generator';
import { generateSystems, generateSystem } from './system-generator';
import { generatePlanets, generatePlanet } from './planet-generator';
import { generateBlackHoles, generateBlackHole } from './black-hole-generator';
import {
  generateAsteroidBelts,
  generateAsteroidBelt,
} from './asteroid-belt-generator';
import {
  generateDeepSpaceStations,
  generateDeepSpaceStation,
} from './deep-space-station-generator';
import {
  generateOrbitalRuins,
  generateOrbitalRuin,
} from './orbital-ruin-generator';
import {
  generateAsteroidBases,
  generateAsteroidBase,
} from './asteroid-base-generator';
import {
  generateGasGiantMines,
  generateGasGiantMine,
} from './gas-giant-mine-generator';
import { generateMoons, generateMoon } from './moon-generator';
import { generateMoonBases, generateMoonBase } from './moon-base-generator';
import {
  generateRefuelingStations,
  generateRefuelingStation,
} from './refueling-station-generator';
import {
  generateResearchBases,
  generateResearchBase,
} from './research-base-generator';
import {
  generateSpaceStations,
  generateSpaceStation,
} from './space-station-generator';

export default {
  [Entities.asteroidBase.key]: {
    generateOne: generateAsteroidBase,
    generateAll: generateAsteroidBases,
  },
  [Entities.asteroidBelt.key]: {
    generateOne: generateAsteroidBelt,
    generateAll: generateAsteroidBelts,
  },
  [Entities.blackHole.key]: {
    generateOne: generateBlackHole,
    generateAll: generateBlackHoles,
  },
  [Entities.deepSpaceStation.key]: {
    generateOne: generateDeepSpaceStation,
    generateAll: generateDeepSpaceStations,
  },
  [Entities.gasGiantMine.key]: {
    generateOne: generateGasGiantMine,
    generateAll: generateGasGiantMines,
  },
  [Entities.moon.key]: {
    generateOne: generateMoon,
    generateAll: generateMoons,
  },
  [Entities.moonBase.key]: {
    generateOne: generateMoonBase,
    generateAll: generateMoonBases,
  },
  [Entities.orbitalRuin.key]: {
    generateOne: generateOrbitalRuin,
    generateAll: generateOrbitalRuins,
  },
  [Entities.planet.key]: {
    generateOne: generatePlanet,
    generateAll: generatePlanets,
  },
  [Entities.refuelingStation.key]: {
    generateOne: generateRefuelingStation,
    generateAll: generateRefuelingStations,
  },
  [Entities.researchBase.key]: {
    generateOne: generateResearchBase,
    generateAll: generateResearchBases,
  },
  [Entities.sector.key]: {
    generateOne: generateSector,
    generateAll: () => ({ children: [] }),
  },
  [Entities.spaceStation.key]: {
    generateOne: generateSpaceStation,
    generateAll: generateSpaceStations,
  },
  [Entities.system.key]: {
    generateOne: generateSystem,
    generateAll: generateSystems,
  },
};
