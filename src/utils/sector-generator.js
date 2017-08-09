import Chance from 'chance';
import { mapValues, zipObject } from 'lodash';

import { generateSectorName, generateName } from 'utils/name-generator';
import { isBetween, coordinateKey } from 'utils/common';
import { worldTagKeys } from 'constants/world-tags';

class System {
  constructor(config, x, y) {
    this.config = config;
    this.name = generateName(this.config.seededChance);
    const planetArray = [
      ...Array(this.config.seededChance.weighted([1, 2, 3], [5, 3, 2])),
    ].map(() => ({
      name: generateName(this.config.seededChance),
      tags: this.config.seededChance.pickset(Object.keys(worldTagKeys), 2),
    }));
    this.planets = zipObject(
      planetArray.map(planet => planet.name.toLowerCase()),
      planetArray,
    );
    this.x =
      x ||
      this.config.seededChance.integer({
        min: this.config.index,
        max: this.config.columns,
      });
    this.y =
      y ||
      this.config.seededChance.integer({
        min: this.config.index,
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
    location: {
      x: this.x,
      y: this.y,
    },
  });

  isRowValid(num) {
    return isBetween(num, this.config.index, this.config.rows);
  }

  isColumnValid(num) {
    return isBetween(num, this.config.index, this.config.columns);
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

const randomNeighbor = (neighbors, existingLocs, seededChance) => {
  const filteredNeighbors = neighbors.filter(
    system => !existingLocs.includes(system.key),
  );
  return filteredNeighbors.length && seededChance.pickone(filteredNeighbors);
};

const fullRandomGenerate = config => {
  const systems = {};
  const numHexes = config.rows * config.columns;
  const systemNum =
    config.seededChance.integer({ min: 0, max: Math.floor(numHexes / 8) }) +
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
          config.seededChance,
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

export default config => {
  const newConfig = {
    ...config,
    index: 1,
    seededChance: new Chance(config.seed),
  };
  const name = generateSectorName(newConfig.seededChance);

  const sector = {
    name,
    seed: newConfig.seed,
    systems: fullRandomGenerate(newConfig),
  };

  return sector;
};
