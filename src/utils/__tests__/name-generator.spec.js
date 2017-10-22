import Chance from 'chance';

import { GreekLetters } from 'constants/language';
import { generateName, generateSectorName } from '../name-generator';

describe('generateName', () => {
  let chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it('uppercases the first letter of the name', () => {
    const firstLetter = generateName(chance)[0];
    expect(firstLetter).toEqual(firstLetter.toUpperCase());
  });

  it("doesn't generate the same name twice", () => {
    const name = generateName(chance);
    expect(generateName(chance)).not.toEqual(name);
  });
});

describe('generateSectorName', () => {
  let chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it('contains a greek letter', () => {
    const name = generateSectorName(chance);
    expect(GreekLetters.filter(letter => name.includes(letter))).toHaveLength(
      1,
    );
  });

  it('is two words', () => {
    expect(generateSectorName(chance).split(' ')).toHaveLength(2);
  });

  it("doesn't generate the same name twice", () => {
    const name = generateSectorName(chance);
    expect(generateSectorName(chance)).not.toEqual(name);
  });
});
