const researchBase = {
  key: 'researchBase',
  name: 'Research Base',
  children: [],
};

const refuelingStation = {
  key: 'refuelingStation',
  name: 'Refueling Station',
  children: [],
};

const moonBase = {
  key: 'moonBase',
  name: 'Moon Base',
  children: [],
};

const orbitalRuin = {
  key: 'orbitalRuin',
  name: 'Orbital Ruin',
  children: [],
};

const gasGiantMine = {
  key: 'gasGiantMine',
  name: 'Gas Giant Mine',
  children: [],
};

const spaceStation = {
  key: 'spaceStation',
  name: 'Space Station',
  children: [],
};

const asteroidBase = {
  key: 'asteroidBase',
  name: 'Asteroid Base',
  children: [],
};

const moon = {
  key: 'moon',
  name: 'Moon',
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
  children: [moon.key, orbitalRuin.key, researchBase.key, refuelingStation.key],
};

const blackHole = {
  key: 'blackHole',
  name: 'Black Hole',
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
  children: [asteroidBase.key, refuelingStation.key, researchBase.key],
};

const deepSpaceStation = {
  key: 'deepSpaceStation',
  name: 'Deep-Space Station',
  children: [],
};

const system = {
  key: 'system',
  name: 'System',
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
