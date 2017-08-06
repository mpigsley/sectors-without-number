/* eslint-disable no-bitwise */
const { StarDigraphs, GreekLetters } = require('../constants/language');
const { capitalizeFirstLetter } = require('../utils/common');

const tweakSeeds = hexSeeds => {
  const newSeeds = hexSeeds.concat([
    hexSeeds.reduce((a, b) => a + b, 0) % 0x10000,
  ]);
  newSeeds.shift();
  return newSeeds;
};

export const generateName = seededChance => {
  const hash = seededChance.hash({ length: 12 });
  let name = '';
  let hexSeeds = [
    parseInt(hash.substr(0, 4), 16),
    parseInt(hash.substr(4, 4), 16),
    parseInt(hash.substr(8, 4), 16),
  ];
  const longNameFlag = hexSeeds[0] & 0x40;
  for (let n = 0; n < 4; n += 1) {
    const d = ((hexSeeds[2] >> 8) & 0x1f) << 1;
    hexSeeds = tweakSeeds(hexSeeds);
    if (n < 3 || longNameFlag) {
      name += StarDigraphs.substr(d, 2);
    }
  }
  return capitalizeFirstLetter(name.split('.').join(''));
};

export const generateSectorName = seededChance => {
  const greek = seededChance.pickone(GreekLetters);
  return `${generateName(seededChance)} ${greek}`;
};
