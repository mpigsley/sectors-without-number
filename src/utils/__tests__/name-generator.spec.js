import Chance from 'chance';

import { GreekLetters } from 'constants/language';
import { generateName, generateSectorName } from '../name-generator';

describe('generateName', () => {
  let seededChance;
  beforeEach(() => {
    seededChance = new Chance('asdfghjkl');
  });

  it('uppercases the first letter of the name', () => {
    const firstLetter = generateName(seededChance)[0];
    expect(firstLetter).toEqual(firstLetter.toUpperCase());
  });

  it('generates the correct name given a specific seed', () => {
    expect(generateName(seededChance)).toEqual('Matixeceon');
  });

  it("doesn't generate the same name twice", () => {
    const name = generateName(seededChance);
    expect(generateName(seededChance)).not.toEqual(name);
  });
});

describe('generateSectorName', () => {
  let seededChance;
  beforeEach(() => {
    seededChance = new Chance('asdfghjkl');
  });

  it('contains a greek letter', () => {
    const name = generateSectorName(seededChance);
    expect(GreekLetters.filter(letter => name.includes(letter))).toHaveLength(
      1,
    );
  });

  it('is two words', () => {
    expect(generateSectorName(seededChance).split(' ')).toHaveLength(2);
  });

  it('generates the correct name given a specific seed', () => {
    expect(generateSectorName(seededChance)).toEqual('Edena Omega');
  });

  it("doesn't generate the same name twice", () => {
    const name = generateSectorName(seededChance);
    expect(generateSectorName(seededChance)).not.toEqual(name);
  });
});
