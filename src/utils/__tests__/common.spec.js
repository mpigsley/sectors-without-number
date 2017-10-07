import {
  capitalizeFirstLetter,
  isBetween,
  coordinateKey,
  stringSortByKey,
  toCommaArray,
} from '../common';

describe('capitalizeFirstLetter', () => {
  it('capitalizes first letter', () => {
    expect(capitalizeFirstLetter('test')).toEqual('Test');
    expect(capitalizeFirstLetter('a')).toEqual('A');
  });

  it('returns empty string if string is falsey', () => {
    expect(capitalizeFirstLetter(null)).toEqual('');
    expect(capitalizeFirstLetter(undefined)).toEqual('');
    expect(capitalizeFirstLetter('')).toEqual('');
    expect(capitalizeFirstLetter()).toEqual('');
  });
});

describe('isBetween', () => {
  it('returns true if between', () => {
    expect(isBetween(4, 4, 6)).toEqual(true);
    expect(isBetween(5, 4, 6)).toEqual(true);
    expect(isBetween(6, 4, 6)).toEqual(true);
  });

  it('returns false if not between', () => {
    expect(isBetween(3, 4, 6)).toEqual(false);
    expect(isBetween(7, 4, 6)).toEqual(false);
  });
});

describe('stringSortByKey', () => {
  let objectArr = null;
  beforeEach(() => {
    objectArr = [
      { name: 'asdf' },
      { name: 'sdfg' },
      { name: 'dfgh' },
      { name: 'fghj' },
    ];
  });

  it('should sort an array of objects by a specified key', () => {
    expect(objectArr.sort(stringSortByKey('name'))).toMatchObject([
      { name: 'asdf' },
      { name: 'dfgh' },
      { name: 'fghj' },
      { name: 'sdfg' },
    ]);
  });

  it('should just return the array if key is not found in objects', () => {
    expect(objectArr.sort(stringSortByKey('notInObject'))).toMatchObject([
      { name: 'asdf' },
      { name: 'sdfg' },
      { name: 'dfgh' },
      { name: 'fghj' },
    ]);
  });
});

describe('coordinateKey', () => {
  it('returns the correct coordinate key string', () => {
    expect(coordinateKey(4, 4)).toEqual('0303');
    expect(coordinateKey(10, 11)).toEqual('0910');
  });

  it('returns negative values in string', () => {
    expect(coordinateKey(0, 0)).toEqual('0-10-1');
    expect(coordinateKey(-100, -100)).toEqual('0-1010-101');
  });
});

describe('toCommaArray', () => {
  it("doesn't add a comma to the first element", () => {
    expect(toCommaArray('test', 0)).toEqual('test');
  });

  it('adds a comma to all subsequent elements', () => {
    expect(toCommaArray('test', 1)).toEqual(', test');
    expect(toCommaArray('test', 9573618)).toEqual(', test');
  });

  it('combines into a nice string array when iterated over', () => {
    expect(['a', 'b', 'c', 'd'].map(toCommaArray).join('')).toEqual(
      'a, b, c, d',
    );
  });
});
