export const capitalizeFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const isBetween = (num, min, max) => num >= min && num <= max;

export const coordinateKey = (x, y) => {
  const stringX = x - 1 < 10 ? `0${x - 1}` : `${x - 1}`;
  const stringY = y - 1 < 10 ? `0${y - 1}` : `${y - 1}`;
  return `${stringX}${stringY}`;
};

export const stringSortByKey = key => (a, b) => {
  const keyA = a[key].toUpperCase();
  const keyB = b[key].toUpperCase();
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
};
