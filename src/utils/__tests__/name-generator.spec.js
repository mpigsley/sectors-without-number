import Chance from 'chance';

import GreekLetters from 'constants/language/greek-letters';
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
    expect(
      GreekLetters.filter(letter => name.includes(letter)).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('is two or three words', () => {
    expect(
      [2, 3].indexOf(generateSectorName(chance).split(' ').length) >= 0,
    ).toEqual(true);
  });

  it("doesn't generate the same name twice", () => {
    const name = generateSectorName(chance);
    expect(generateSectorName(chance)).not.toEqual(name);
  });
});
