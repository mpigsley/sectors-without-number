import Chance from 'chance';
import { isNumber } from 'lodash';

export const createId = () => new Chance().hash({ length: 20 });

export const coordinateKey = (x, y) => {
  const stringX = x - 1 < 10 ? `0${x - 1}` : `${x - 1}`;
  const stringY = y - 1 < 10 ? `0${y - 1}` : `${y - 1}`;
  return `${stringX}${stringY}`;
};

// Assumes x/y is less than 100
export const coordinatesFromKey = key => {
  if (!key) {
    return { x: null, y: null };
  }
  return {
    x: Number.parseInt(key.substring(0, 2), 10) + 1,
    y: Number.parseInt(key.substring(2, 4), 10) + 1,
  };
};

export const allSectorCoordinates = (width = 0, height = 0) => {
  const keys = [];
  for (let x = 1; x <= width; x += 1) {
    for (let y = 1; y <= height; y += 1) {
      keys.push({ x, y });
    }
  }
  return keys;
};

export const allSectorKeys = (width = 0, height = 0) =>
  allSectorCoordinates(width, height)
    .map(({ x, y }) => coordinateKey(x, y))
    .sort();

export const sortByKey = key => (a, b) => {
  const keyA = isNumber(a[key]) ? a[key] : (a[key] || '').toUpperCase();
  const keyB = isNumber(b[key]) ? b[key] : (b[key] || '').toUpperCase();
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
};

export const toCommaArray = (element, i) => `${i !== 0 ? ', ' : ''}${element}`;
