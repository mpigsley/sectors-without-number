/* eslint-disable no-bitwise */
import Chance from 'chance';
import { forEach, capitalize, toUpper } from 'lodash';

import CosmicNames from 'constants/language/cosmic-names';
import GreekLetters from 'constants/language/greek-letters';
import MarsCraters from 'constants/language/mars-craters';

const tweakSeeds = hexSeeds => {
  const newSeeds = hexSeeds.concat([
    hexSeeds.reduce((a, b) => a + b, 0) % 0x10000,
  ]);
  newSeeds.shift();
  return newSeeds;
};

const generateFullRandomName = (chance = new Chance()) => {
  const hash = chance.hash({ length: 12 });
  let name = '';
  let hexSeeds = [
    parseInt(hash.substr(0, 4), 16),
    parseInt(hash.substr(4, 4), 16),
    parseInt(hash.substr(8, 4), 16),
  ];
  const longNameFlag = hexSeeds[0] & 0x40;
  for (let n = 0; n < 5; n += 1) {
    const d = ((hexSeeds[2] >> 8) & 0x1f) << 1;
    hexSeeds = tweakSeeds(hexSeeds);
    if (n < 3 || longNameFlag) {
      name += '..lexegezacebisousesarmaindirea.eratenberalavetiedorquanteisrion'.substr(
        d,
        2,
      );
    }
  }
  return capitalize(name.split('.').join(''));
};

const romanize = num => {
  const lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let numToRomanize = num;
  let roman = '';
  forEach(lookup, (divisor, letter) => {
    while (numToRomanize >= divisor) {
      roman += letter;
      numToRomanize -= divisor;
    }
  });
  return roman;
};

export const generateName = (chance = new Chance()) => {
  let name;
  if (chance.weighted([true, false], [30, 1])) {
    name = chance.pickone(CosmicNames);
  } else {
    name = generateFullRandomName(chance);
  }
  if (chance.weighted([true, false], [1, 40])) {
    name += ` ${romanize(chance.integer({ min: 1, max: 25 }))}`;
  }
  return name;
};

export const generateSectorName = (chance = new Chance()) => {
  const greek = chance.pickone(GreekLetters);
  return `${generateName(chance)} ${greek}`;
};

export const generateBlackHoleName = (chance = new Chance()) => {
  const numCharacters = chance.weighted([1, 2, 3, 4], [1, 5, 8, 5]);
  const numNumbers = chance.weighted([3, 4, 5, 6], [1, 1, 2, 3]);

  const space = chance.pickone([true, false]) ? ' ' : '';
  let string = chance.string({
    length: numCharacters,
    pool: 'abcdefghijklmnopqrstuvwxyz',
  });
  string = chance.pickone([true, false]) ? toUpper(string) : capitalize(string);
  let number = chance.string({ length: numNumbers, pool: '0123456789' });
  if (chance.pickone([true, false])) {
    const randomIndex = chance.integer({ min: 1, max: numNumbers - 2 });
    number = `${number.substring(0, randomIndex)}-${number.substring(
      randomIndex,
      numNumbers - 1,
    )}`;
  }
  return `${string}${space}${number}`;
};

export const generateAsteroidBeltName = (chance = new Chance()) => {
  const numNumbers = chance.weighted([1, 2, 3, 4, 5], [1, 3, 4, 2, 1]);
  let number = chance.string({ length: numNumbers, pool: '0123456789' });
  if (chance.pickone([true, false])) {
    number = `(${number}) `;
  }
  return `${number} ${chance.pickone(MarsCraters)}`;
};

export const generateStationName = (chance = new Chance()) =>
  `${chance.pickone(MarsCraters)} ${chance.string({
    length: 1,
    pool: ' 123456789',
  })}`.trim();

export const generateMineName = (chance = new Chance()) =>
  `${chance.pickone(MarsCraters)}${
    chance.pickone([true, false]) ? ' Mine' : ''
  }${chance.pickone([true, false]) ? ' Project' : ''}`;
