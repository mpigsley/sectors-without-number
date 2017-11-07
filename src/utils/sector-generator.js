import Chance from 'chance';
import { mapValues, zipObject } from 'lodash';

import { generateSectorName, generateName } from 'utils/name-generator';
import { isBetween, coordinateKey } from 'utils/common';
import { worldTagKeys } from 'constants/world-tags';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';

const INDEX = 1;
const DEFAULT_ROWS = 10;
const DEFAULT_COLUMNS = 8;

export const generatePlanet = (chance, existingName) => () => {
  const name = existingName || generateName(chance);
  return {
    name,
    key: encodeURIComponent(name.toLowerCase()),
    tags: chance.pickset(Object.keys(worldTagKeys), 2),
    techLevel: `TL${chance.weighted(
      ['0', '1', '2', '3', '4', '4+', '5'],
      [1, 1, 2, 2, 3, 1, 1],
    )}`,
    atmosphere: chance.weighted(Object.keys(Atmosphere), [1, 1, 1, 5, 1, 1, 1]),
    temperature: chance.weighted(Object.keys(Temperature), [
      1,
      1,
      2,
      3,
      2,
      1,
      1,
    ]),
    biosphere: chance.weighted(Object.keys(Biosphere), [1, 1, 2, 3, 2, 1, 1]),
    population: chance.weighted(Object.keys(Population), [1, 1, 2, 3, 2, 1, 1]),
  };
};

export class System {
  constructor(config, x, y, name, planetNames) {
    this.config = config;
    this.name = name || generateName(this.config.chance);

    let planetArray = [
      ...Array(this.config.chance.weighted([1, 2, 3], [5, 3, 2])),
    ].map(generatePlanet(this.config.chance));
    if (planetNames) {
      planetArray = planetNames.map(planetName =>
        generatePlanet(this.config.chance, planetName)(),
      );
    }

    this.planets = zipObject(
      planetArray.map(planet => planet.key),
      planetArray,
    );

    this.x =
      x ||
      this.config.chance.integer({
        min: INDEX,
        max: this.config.columns,
      });
    this.y =
      y ||
      this.config.chance.integer({
        min: INDEX,
        max: this.config.rows,
      });
  }

  get key() {
    return coordinateKey(this.x, this.y);
  }

  toJSON = () => ({
    name: this.name,
    planets: this.planets,
    key: this.key,
  });

  isRowValid(num) {
    return isBetween(num, INDEX, this.config.rows);
  }

  isColumnValid(num) {
    return isBetween(num, INDEX, this.config.columns);
  }

  isLocationValid(x, y) {
    return this.isRowValid(y) && this.isColumnValid(x);
  }

  getNeighbors() {
    const neighbors = [];
    if (this.x % 2) {
      if (this.isLocationValid(this.x + 1, this.y)) {
        neighbors.push(new System(this.config, this.x + 1, this.y));
      }
      if (this.isLocationValid(this.x + 1, this.y - 1)) {
        neighbors.push(new System(this.config, this.x + 1, this.y - 1));
      }
      if (this.isLocationValid(this.x, this.y - 1)) {
        neighbors.push(new System(this.config, this.x, this.y - 1));
      }
      if (this.isLocationValid(this.x - 1, this.y - 1)) {
        neighbors.push(new System(this.config, this.x - 1, this.y - 1));
      }
      if (this.isLocationValid(this.x - 1, this.y)) {
        neighbors.push(new System(this.config, this.x - 1, this.y));
      }
      if (this.isLocationValid(this.x, this.y + 1)) {
        neighbors.push(new System(this.config, this.x, this.y + 1));
      }
    } else {
      if (this.isLocationValid(this.x + 1, this.y + 1)) {
        neighbors.push(new System(this.config, this.x + 1, this.y + 1));
      }
      if (this.isLocationValid(this.x + 1, this.y)) {
        neighbors.push(new System(this.config, this.x + 1, this.y));
      }
      if (this.isLocationValid(this.x, this.y - 1)) {
        neighbors.push(new System(this.config, this.x, this.y - 1));
      }
      if (this.isLocationValid(this.x - 1, this.y)) {
        neighbors.push(new System(this.config, this.x - 1, this.y));
      }
      if (this.isLocationValid(this.x - 1, this.y + 1)) {
        neighbors.push(new System(this.config, this.x - 1, this.y + 1));
      }
      if (this.isLocationValid(this.x, this.y + 1)) {
        neighbors.push(new System(this.config, this.x, this.y + 1));
      }
    }
    return neighbors;
  }
}

const randomNeighbor = (neighbors, existingLocs, chance) => {
  const filteredNeighbors = neighbors.filter(
    system => !existingLocs.includes(system.key),
  );
  return filteredNeighbors.length && chance.pickone(filteredNeighbors);
};

const fullRandomGenerate = config => {
  const systems = {};
  const numHexes = config.rows * config.columns;
  const systemNum =
    config.chance.integer({ min: 0, max: Math.floor(numHexes / 8) }) +
    Math.floor(numHexes / 4);
  let extra = systemNum;

  while (extra) {
    let newExtra = 0;
    [...Array(extra)].forEach(() => {
      const system = new System(config);
      if (systems[system.key]) {
        const neighbor = randomNeighbor(
          system.getNeighbors(),
          Object.keys(systems),
          config.chance,
        );

        if (neighbor) {
          systems[neighbor.key] = neighbor;
        } else {
          newExtra += 1;
        }
      } else {
        systems[system.key] = system;
      }
    });
    extra = newExtra;
  }

  return mapValues(systems, s => s.toJSON());
};

export default ({
  key = new Chance().hash({ length: 20 }),
  name,
  rows = DEFAULT_ROWS,
  columns = DEFAULT_COLUMNS,
  isBuilder,
}) => ({
  key,
  rows,
  columns,
  name: name || generateSectorName(new Chance()),
  systems: isBuilder
    ? {}
    : fullRandomGenerate({
        chance: new Chance(),
        rows,
        columns,
      }),
});
