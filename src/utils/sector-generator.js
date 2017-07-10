import Chance from 'chance';
import { mapValues } from 'lodash';

import { generateSectorName, generateName } from './name-generator';
import { isBetween } from '../utils/common';

class System {
  constructor(config, x, y) {
    this.config = config;
    this.name = generateName(this.config.seededChance);
    this.planets = [...Array(this.config.seededChance.weighted([1, 2, 3], [5, 3, 2]))].map(() => ({
      name: generateName(this.config.seededChance),
    }));
    this.x = x || this.config.seededChance.integer({
      min: this.config.index,
      max: this.config.rows,
    });
    this.y = y || this.config.seededChance.integer({
      min: this.config.index,
      max: this.config.columns,
    });
  }

  get key() {
    return `${this.x},${this.y}`;
  }

  toJSON() {
    return {
      name: this.name,
      planets: this.planets,
      key: this.key,
      location: {
        x: this.x,
        y: this.y,
      },
    };
  }

  closestToSideOffset() {
    return Math.min(
      this.y - this.config.index,
      this.config.maxCol - this.y,
      this.x - this.config.index,
      this.config.maxRow - this.x,
    );
  }

  averageToSideOffset() {
    return (
      (Math.min(this.y - this.config.index, this.config.maxCol - this.y) +
        Math.min(this.x - this.config.index, this.config.maxRow - this.x)) /
      4
    );
  }

  isRowValid(num) {
    return isBetween(num, this.config.index, this.config.maxRow);
  }

  isColumnValid(num) {
    return isBetween(num, this.config.index, this.config.maxCol);
  }

  isLocationValid(x, y) {
    return this.isRowValid(x) && this.isColumnValid(y);
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

const randomNeighbor = (neighbors, existingLocs, seededChance) => neighbors.length &&
  seededChance.pickone(neighbors.filter(system => !existingLocs.includes(system.key)));

// TODO
// const smartGenerate = () => {
//   const systems = {};
//   return systems;
// };

const fullRandomGenerate = (config) => {
  const systems = {};
  const systemNum = config.seededChance.d10() + 20;
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

export default (config) => {
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
