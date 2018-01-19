/* eslint-disable no-bitwise */
import Chance from 'chance';
import { capitalize, toUpper } from 'lodash';

import { StarDigraphs, GreekLetters, MarsCraters } from 'constants/language';

const tweakSeeds = hexSeeds => {
  const newSeeds = hexSeeds.concat([
    hexSeeds.reduce((a, b) => a + b, 0) % 0x10000,
  ]);
  newSeeds.shift();
  return newSeeds;
};

export const generateName = (chance = new Chance()) => {
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
      name += StarDigraphs.substr(d, 2);
    }
  }
  return capitalize(name.split('.').join(''));
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
