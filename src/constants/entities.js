import {
  generateName,
  generateSectorName,
  generateBlackHoleName,
  generateAsteroidBeltName,
  generateStationName,
  generateMineName,
} from 'utils/name-generator';
import { mapValues } from 'constants/lodash';

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

const emptyOccupation = {
  name: 'misc.occupation',
  key: 'occupation',
  attributes: {},
};

const emptySituation = {
  name: 'misc.situation',
  key: 'situation',
  attributes: {},
};

const buildEntity = entity => ({
  topLevel: false,
  nameGenerator: () => {},
  attributes: [],
  children: [],
  action: 'default',
  sidebar: 'default',
  ...entity,
});

// *********** Extraneous ***********
const layer = {
  key: 'layer',
  name: 'entity.layer',
  shortName: 'entity.layer',
  sidebar: 'layer',
  action: 'layer',
  extraneous: true,
};

const navigation = {
  key: 'navigation',
  name: 'entity.navigation',
  shortName: 'entity.navigation',
  sidebar: 'navigation',
  extraneous: true,
};

const note = {
  key: 'note',
  name: 'entity.note',
  shortName: 'entity.note',
  sidebar: 'note',
  action: 'entity',
  extraneous: true,
};

const settings = {
  key: 'settings',
  name: 'misc.settings',
  shortName: 'misc.settings',
  sidebar: 'settings',
  extraneous: true,
};
// **********************************

const researchBase = {
  key: 'researchBase',
  name: 'entity.researchBase',
  shortName: 'entity.base',
  action: 'entity',
  nameGenerator: generateStationName,
  attributes: [ResearchBaseOccupation, ResearchBaseSituation],
  children: [note.key],
};

const refuelingStation = {
  key: 'refuelingStation',
  name: 'entity.refuelingStation',
  shortName: 'entity.station',
  action: 'entity',
  nameGenerator: generateStationName,
  attributes: [RefuelingStationOccupation, RefuelingStationSituation],
  children: [note.key],
};

const moonBase = {
  key: 'moonBase',
  name: 'entity.moonBase',
  shortName: 'entity.base',
  action: 'entity',
  nameGenerator: generateStationName,
  attributes: [MoonBaseOccupation, MoonBaseSituation],
  children: [note.key],
};

const orbitalRuin = {
  key: 'orbitalRuin',
  name: 'entity.orbitalRuin',
  shortName: 'entity.ruin',
  action: 'entity',
  nameGenerator: generateStationName,
  attributes: [OrbitalRuinOccupation, OrbitalRuinSituation],
  children: [note.key],
};

const gasGiantMine = {
  key: 'gasGiantMine',
  name: 'entity.gasGiantMine',
  shortName: 'entity.mine',
  action: 'entity',
  nameGenerator: generateMineName,
  attributes: [GasGiantMineOccupation, GasGiantMineSituation],
  children: [note.key],
};

const spaceStation = {
  key: 'spaceStation',
  name: 'entity.spaceStation',
  shortName: 'entity.station',
  action: 'entity',
  nameGenerator: generateStationName,
  attributes: [SpaceStationOccupation, SpaceStationSituation],
  children: [note.key],
};

const asteroidBase = {
  key: 'asteroidBase',
  name: 'entity.asteroidBase',
  shortName: 'entity.base',
  action: 'entity',
  nameGenerator: generateStationName,
  attributes: [AsteroidBaseOccupation, AsteroidBaseSituation],
  children: [note.key],
};

const moon = {
  key: 'moon',
  name: 'entity.moon',
  shortName: 'entity.moon',
  action: 'entity',
  nameGenerator: generateName,
  attributes: [emptyOccupation, emptySituation],
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
  name: 'entity.planet',
  shortName: 'entity.planet',
  action: 'entity',
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
  name: 'entity.asteroidBelt',
  shortName: 'entity.belt',
  action: 'entity',
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
  name: 'entity.deepSpaceStation',
  shortName: 'entity.station',
  action: 'entity',
  nameGenerator: generateStationName,
  attributes: [SpaceStationOccupation, SpaceStationSituation],
  children: [note.key],
};

const blackHole = {
  key: 'blackHole',
  name: 'entity.blackHole',
  shortName: 'entity.blackHole',
  action: 'entity',
  topLevel: true,
  nameGenerator: generateBlackHoleName,
  attributes: [emptyOccupation, emptySituation],
  children: [
    deepSpaceStation.key,
    note.key,
    orbitalRuin.key,
    planet.key,
    refuelingStation.key,
    researchBase.key,
  ],
};

const system = {
  key: 'system',
  name: 'entity.system',
  shortName: 'entity.system',
  action: 'entity',
  topLevel: true,
  nameGenerator: generateName,
  attributes: [emptyOccupation, emptySituation],
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
  name: 'entity.sector',
  shortName: 'entity.sector',
  action: 'entity',
  nameGenerator: generateSectorName,
  children: [blackHole.key, note.key, system.key],
};

export default mapValues(
  {
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
    settings,
  },
  buildEntity,
);
