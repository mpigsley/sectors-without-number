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

const layer = {
  key: 'layer',
  name: 'entity.layer',
  shortName: 'entity.layer',
  topLevel: false,
  isAdditional: false,
  editable: false,
  nameGenerator: () => {},
  attributes: [],
  children: [],
  sidebar: 'layer',
};

const navigation = {
  key: 'navigation',
  name: 'entity.navigation',
  shortName: 'entity.navigation',
  topLevel: false,
  isAdditional: false,
  editable: false,
  nameGenerator: () => {},
  attributes: [],
  children: [],
  sidebar: 'navigation',
};

const note = {
  key: 'note',
  name: 'entity.note',
  shortName: 'entity.note',
  topLevel: false,
  isAdditional: false,
  editable: true,
  nameGenerator: () => {},
  attributes: [],
  children: [],
  sidebar: 'note',
};

const researchBase = {
  key: 'researchBase',
  name: 'entity.researchBase',
  shortName: 'entity.base',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateStationName,
  attributes: [ResearchBaseOccupation, ResearchBaseSituation],
  children: [note.key],
  sidebar: 'defualt',
};

const refuelingStation = {
  key: 'refuelingStation',
  name: 'entity.refuelingStation',
  shortName: 'entity.station',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateStationName,
  attributes: [RefuelingStationOccupation, RefuelingStationSituation],
  children: [note.key],
  sidebar: 'defualt',
};

const moonBase = {
  key: 'moonBase',
  name: 'entity.moonBase',
  shortName: 'entity.base',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateStationName,
  attributes: [MoonBaseOccupation, MoonBaseSituation],
  children: [note.key],
  sidebar: 'defualt',
};

const orbitalRuin = {
  key: 'orbitalRuin',
  name: 'entity.orbitalRuin',
  shortName: 'entity.ruin',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateStationName,
  attributes: [OrbitalRuinOccupation, OrbitalRuinSituation],
  children: [note.key],
  sidebar: 'defualt',
};

const gasGiantMine = {
  key: 'gasGiantMine',
  name: 'entity.gasGiantMine',
  shortName: 'entity.mine',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateMineName,
  attributes: [GasGiantMineOccupation, GasGiantMineSituation],
  children: [note.key],
  sidebar: 'defualt',
};

const spaceStation = {
  key: 'spaceStation',
  name: 'entity.spaceStation',
  shortName: 'entity.station',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateStationName,
  attributes: [SpaceStationOccupation, SpaceStationSituation],
  children: [note.key],
  sidebar: 'defualt',
};

const asteroidBase = {
  key: 'asteroidBase',
  name: 'entity.asteroidBase',
  shortName: 'entity.base',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateStationName,
  attributes: [AsteroidBaseOccupation, AsteroidBaseSituation],
  children: [note.key],
  sidebar: 'defualt',
};

const moon = {
  key: 'moon',
  name: 'entity.moon',
  shortName: 'entity.moon',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateName,
  children: [
    moonBase.key,
    note.key,
    orbitalRuin.key,
    refuelingStation.key,
    researchBase.key,
  ],
  sidebar: 'defualt',
};

const planet = {
  key: 'planet',
  name: 'entity.planet',
  shortName: 'entity.planet',
  topLevel: false,
  isAdditional: false,
  editable: true,
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
  sidebar: 'defualt',
};

const asteroidBelt = {
  key: 'asteroidBelt',
  name: 'entity.asteroidBelt',
  shortName: 'entity.belt',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateAsteroidBeltName,
  attributes: [AsteroidBeltOccupation, AsteroidBeltSituation],
  children: [
    asteroidBase.key,
    note.key,
    refuelingStation.key,
    researchBase.key,
    spaceStation.key,
  ],
  sidebar: 'defualt',
};

const deepSpaceStation = {
  key: 'deepSpaceStation',
  name: 'entity.deepSpaceStation',
  shortName: 'entity.station',
  topLevel: false,
  isAdditional: true,
  editable: true,
  nameGenerator: generateStationName,
  attributes: [SpaceStationOccupation, SpaceStationSituation],
  children: [note.key],
  sidebar: 'defualt',
};

const blackHole = {
  key: 'blackHole',
  name: 'entity.blackHole',
  shortName: 'entity.blackHole',
  topLevel: true,
  isAdditional: true,
  editable: true,
  nameGenerator: generateBlackHoleName,
  children: [
    deepSpaceStation.key,
    note.key,
    orbitalRuin.key,
    planet.key,
    refuelingStation.key,
    researchBase.key,
  ],
  sidebar: 'defualt',
};

const system = {
  key: 'system',
  name: 'entity.system',
  shortName: 'entity.system',
  topLevel: true,
  isAdditional: false,
  editable: true,
  nameGenerator: generateName,
  children: [
    asteroidBelt.key,
    deepSpaceStation.key,
    note.key,
    planet.key,
    refuelingStation.key,
    researchBase.key,
  ],
  sidebar: 'defualt',
};

const sector = {
  key: 'sector',
  name: 'entity.sector',
  shortName: 'entity.sector',
  topLevel: false,
  isAdditional: false,
  editable: true,
  nameGenerator: generateSectorName,
  children: [blackHole.key, note.key, system.key],
  sidebar: 'defualt',
};

export default {
  asteroidBase,
  asteroidBelt,
  blackHole,
  deepSpaceStation,
  gasGiantMine,
  layer,
  moon,
  moonBase,
  navigation,
  note,
  orbitalRuin,
  planet,
  refuelingStation,
  researchBase,
  sector,
  spaceStation,
  system,
};
