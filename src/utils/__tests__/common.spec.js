import {
  coordinateKey,
  coordinatesFromKey,
  allSectorKeys,
  sortByKey,
  toCommaArray,
} from '../common';

describe('sortByKey', () => {
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
    expect(objectArr.sort(sortByKey('name'))).toMatchObject([
      { name: 'asdf' },
      { name: 'dfgh' },
      { name: 'fghj' },
      { name: 'sdfg' },
    ]);
  });

  it('should just return the array if key is not found in objects', () => {
    expect(objectArr.sort(sortByKey('notInObject'))).toMatchObject([
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

describe('coordinatesFromKey', () => {
  it('returns the correct coordinates from the key string `0000`', () => {
    const { x, y } = coordinatesFromKey('0000');
    expect(x).toEqual(1);
    expect(y).toEqual(1);
  });
  it('returns the correct coordinates from the key string `9999`', () => {
    const { x, y } = coordinatesFromKey('9999');
    expect(x).toEqual(100);
    expect(y).toEqual(100);
  });
});

describe('allSectorKeys', () => {
  it('should return an empty array if no parameters are given', () => {
    expect(allSectorKeys()).toHaveLength(0);
  });

  it('should give all keys in a 2x2 grid', () => {
    const keys = allSectorKeys(2, 2);
    expect(keys).toContain('0000');
    expect(keys).toContain('0001');
    expect(keys).toContain('0100');
    expect(keys).toContain('0101');
    expect(keys).toHaveLength(4);
  });

  it('should give all keys in a very large grid', () => {
    const width = 123;
    const height = 1234;
    expect(allSectorKeys(width, height)).toHaveLength(width * height);
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
