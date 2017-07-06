import Chance from 'chance';
import _ from 'lodash';

import { generateSectorName, generateName } from './name-generator';
import { isBetween } from '../utils/common';

class Star {
  constructor(config, x, y) {
    this.config = config;
    this.name = generateName(this.config.seededChance);
    this.planets = [...Array(this.config.seededChance.weighted([1, 2, 3], [5, 3, 2]))].map(() => ({
      name: generateName(this.config.seededChance),
    }));
    this.x =
      x ||
      this.config.seededChance.integer({
        min: this.config.index,
        max: this.config.maxRow,
      });
    this.y =
      y ||
      this.config.seededChance.integer({
        min: this.config.index,
        max: this.config.maxCol,
      });
  }

  get key() {
    return `${this.x},${this.y}`;
  }

  toJSON() {
    return {
      name: this.name,
      planets: this.planets,
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
        neighbors.push(new Star(this.config, this.x + 1, this.y));
      }
      if (this.isLocationValid(this.x + 1, this.y - 1)) {
        neighbors.push(new Star(this.config, this.x + 1, this.y - 1));
      }
      if (this.isLocationValid(this.x, this.y - 1)) {
        neighbors.push(new Star(this.config, this.x, this.y - 1));
      }
      if (this.isLocationValid(this.x - 1, this.y - 1)) {
        neighbors.push(new Star(this.config, this.x - 1, this.y - 1));
      }
      if (this.isLocationValid(this.x - 1, this.y)) {
        neighbors.push(new Star(this.config, this.x - 1, this.y));
      }
      if (this.isLocationValid(this.x, this.y + 1)) {
        neighbors.push(new Star(this.config, this.x, this.y + 1));
      }
    } else {
      if (this.isLocationValid(this.x + 1, this.y + 1)) {
        neighbors.push(new Star(this.config, this.x + 1, this.y + 1));
      }
      if (this.isLocationValid(this.x + 1, this.y)) {
        neighbors.push(new Star(this.config, this.x + 1, this.y));
      }
      if (this.isLocationValid(this.x, this.y - 1)) {
        neighbors.push(new Star(this.config, this.x, this.y - 1));
      }
      if (this.isLocationValid(this.x - 1, this.y)) {
        neighbors.push(new Star(this.config, this.x - 1, this.y));
      }
      if (this.isLocationValid(this.x - 1, this.y + 1)) {
        neighbors.push(new Star(this.config, this.x - 1, this.y + 1));
      }
      if (this.isLocationValid(this.x, this.y + 1)) {
        neighbors.push(new Star(this.config, this.x, this.y + 1));
      }
    }
    return neighbors;
  }
}

const randomNeighbor = (neighbors, existingLocs, seededChance) =>
  seededChance.pickone(neighbors.filter(star => !existingLocs.includes(star.key)));

// TODO
// const smartGenerate = () => {
//   const stars = {};
//   return stars;
// };

const fullRandomGenerate = (config) => {
  const stars = {};
  const starNum = config.seededChance.d10() + 20;
  let extra = starNum;

  while (extra) {
    let newExtra = 0;
    [...Array(extra)].forEach(() => {
      const star = new Star(config);
      if (stars[star.key]) {
        const neighbor = randomNeighbor(
          star.getNeighbors(),
          Object.keys(stars),
          config.seededChance,
        );
        if (neighbor) {
          stars[neighbor.key] = neighbor;
        } else {
          newExtra += 1;
        }
      } else {
        stars[star.key] = star;
      }
    });
    extra = newExtra;
  }

  return _.map(stars, s => s.toJSON());
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
    stars: fullRandomGenerate(newConfig),
  };

  return sector;
};
