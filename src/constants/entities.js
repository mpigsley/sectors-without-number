import {
  generateName,
  generateSectorName,
  generateBlackHoleName,
  generateAsteroidBeltName,
  generateStationName,
  generateMineName,
} from 'utils/name-generator';
import WorldTags from 'constants/world-tags';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';
import TechLevel from 'constants/tech-level';
import AsteroidBaseOccupation from 'constants/asteroid-base/occupation';
import AsteroidBaseSituation from 'constants/asteroid-base/situation';
import AsteroidBeltOccupation from 'constants/asteroid-belt/occupation';
import AsteroidBeltSituation from 'constants/asteroid-belt/situation';
import SpaceStationOccupation from 'constants/space-station/occupation';
import SpaceStationSituation from 'constants/space-station/situation';
import GasGiantMineOccupation from 'constants/gas-giant-mine/occupation';
import GasGiantMineSituation from 'constants/gas-giant-mine/situation';
import MoonBaseOccupation from 'constants/moon-base/occupation';
import MoonBaseSituation from 'constants/moon-base/situation';
import OrbitalRuinOccupation from 'constants/orbital-ruin/occupation';
import OrbitalRuinSituation from 'constants/orbital-ruin/situation';
import RefuelingStationOccupation from 'constants/refueling-station/occupation';
import RefuelingStationSituation from 'constants/refueling-station/situation';
import ResearchBaseOccupation from 'constants/research-base/occupation';
import ResearchBaseSituation from 'constants/research-base/situation';

const note = {
  key: 'note',
  name: 'Note',
  shortName: 'Note',
  topLevel: false,
  isAdditional: false,
  nameGenerator: () => {},
  attributes: [],
  children: [],
};

const researchBase = {
  key: 'researchBase',
  name: 'Research Base',
  shortName: 'Base',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateStationName,
  attributes: [ResearchBaseOccupation, ResearchBaseSituation],
  children: [note.key],
};

const refuelingStation = {
  key: 'refuelingStation',
  name: 'Refueling Station',
  shortName: 'Station',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateStationName,
  attributes: [RefuelingStationOccupation, RefuelingStationSituation],
  children: [note.key],
};

const moonBase = {
  key: 'moonBase',
  name: 'Moon Base',
  shortName: 'Base',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateStationName,
  attributes: [MoonBaseOccupation, MoonBaseSituation],
  children: [note.key],
};

const orbitalRuin = {
  key: 'orbitalRuin',
  name: 'Orbital Ruin',
  shortName: 'Ruin',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateStationName,
  attributes: [OrbitalRuinOccupation, OrbitalRuinSituation],
  children: [note.key],
};

const gasGiantMine = {
  key: 'gasGiantMine',
  name: 'Gas Giant Mine',
  shortName: 'Mine',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateMineName,
  attributes: [GasGiantMineOccupation, GasGiantMineSituation],
  children: [note.key],
};

const spaceStation = {
  key: 'spaceStation',
  name: 'Space Station',
  shortName: 'Station',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateStationName,
  attributes: [SpaceStationOccupation, SpaceStationSituation],
  children: [note.key],
};

const asteroidBase = {
  key: 'asteroidBase',
  name: 'Asteroid Base',
  shortName: 'Base',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateStationName,
  attributes: [AsteroidBaseOccupation, AsteroidBaseSituation],
  children: [note.key],
};

const moon = {
  key: 'moon',
  name: 'Moon',
  shortName: 'Moon',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateName,
  children: [
    moonBase.key,
    note.key,
    orbitalRuin.key,
    refuelingStation.key,
    researchBase.key,
  ],
};

const planet = {
  key: 'planet',
  name: 'Planet',
  shortName: 'Planet',
  topLevel: false,
  isAdditional: false,
  tags: WorldTags,
  nameGenerator: generateName,
  attributes: [Atmosphere, Temperature, Biosphere, Population, TechLevel],
  children: [
    gasGiantMine.key,
    moon.key,
    note.key,
    orbitalRuin.key,
    refuelingStation.key,
    researchBase.key,
    spaceStation.key,
  ],
};

const asteroidBelt = {
  key: 'asteroidBelt',
  name: 'Asteroid Belt',
  shortName: 'Belt',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateAsteroidBeltName,
  attributes: [AsteroidBeltOccupation, AsteroidBeltSituation],
  children: [
    asteroidBase.key,
    note.key,
    refuelingStation.key,
    researchBase.key,
    spaceStation.key,
  ],
};

const deepSpaceStation = {
  key: 'deepSpaceStation',
  name: 'Deep-Space Station',
  shortName: 'Station',
  topLevel: false,
  isAdditional: true,
  nameGenerator: generateStationName,
  attributes: [SpaceStationOccupation, SpaceStationSituation],
  children: [note.key],
};

const blackHole = {
  key: 'blackHole',
  name: 'Black Hole',
  shortName: 'Black Hole',
  topLevel: true,
  isAdditional: true,
  nameGenerator: generateBlackHoleName,
  children: [
    deepSpaceStation.key,
    note.key,
    orbitalRuin.key,
    refuelingStation.key,
    researchBase.key,
  ],
};

const system = {
  key: 'system',
  name: 'System',
  shortName: 'System',
  topLevel: true,
  isAdditional: false,
  nameGenerator: generateName,
  children: [
    asteroidBelt.key,
    deepSpaceStation.key,
    note.key,
    planet.key,
    refuelingStation.key,
    researchBase.key,
  ],
};

const sector = {
  key: 'sector',
  name: 'Sector',
  shortName: 'Sector',
  topLevel: false,
  isAdditional: false,
  nameGenerator: generateSectorName,
  children: [blackHole.key, note.key, system.key],
};

export default {
  asteroidBase,
  asteroidBelt,
  blackHole,
  deepSpaceStation,
  gasGiantMine,
  moon,
  moonBase,
  note,
  orbitalRuin,
  planet,
  refuelingStation,
  researchBase,
  sector,
  spaceStation,
  system,
};
