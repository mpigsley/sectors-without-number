const researchBase = {
  key: 'researchBase',
  name: 'Research Base',
  topLevel: false,
  children: [],
};

const refuelingStation = {
  key: 'refuelingStation',
  name: 'Refueling Station',
  topLevel: false,
  children: [],
};

const moonBase = {
  key: 'moonBase',
  name: 'Moon Base',
  topLevel: false,
  children: [],
};

const orbitalRuin = {
  key: 'orbitalRuin',
  name: 'Orbital Ruin',
  topLevel: false,
  children: [],
};

const gasGiantMine = {
  key: 'gasGiantMine',
  name: 'Gas Giant Mine',
  topLevel: false,
  children: [],
};

const spaceStation = {
  key: 'spaceStation',
  name: 'Space Station',
  topLevel: false,
  children: [],
};

const asteroidBase = {
  key: 'asteroidBase',
  name: 'Asteroid Base',
  topLevel: false,
  children: [],
};

const moon = {
  key: 'moon',
  name: 'Moon',
  topLevel: false,
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
  children: [moon.key, orbitalRuin.key, researchBase.key, refuelingStation.key],
};

const blackHole = {
  key: 'blackHole',
  name: 'Black Hole',
  topLevel: true,
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
  children: [asteroidBase.key, refuelingStation.key, researchBase.key],
};

const deepSpaceStation = {
  key: 'deepSpaceStation',
  name: 'Deep-Space Station',
  topLevel: true,
  children: [],
};

const system = {
  key: 'system',
  name: 'System',
  topLevel: true,
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
