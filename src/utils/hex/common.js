/*
 *  Assumes “odd-q” vertical layout
 *  See https://www.redblobgames.com/grids/hexagons
 */

const sizeDiff = Math.sqrt(3) / 2;
export const toWidth = height => height / sizeDiff;
export const toHeight = width => width * sizeDiff;

// Height/Vertical Calculations
export const getTotalHeight = (hexHeight, rows) => (rows + 1 / 2) * hexHeight;
export const getHexHeight = (totalHeight, rows) => totalHeight / (rows + 1 / 2);
export const getRows = (totalHeight, hexHeight) =>
  (totalHeight - 2 / hexHeight) / hexHeight;

// Width/Horizontal Calculations
export const getTotalWidth = (hexWidth, columns) =>
  hexWidth / 4 * (3 * columns + 1);
export const getHexWidth = (totalWidth, columns) =>
  4 * totalWidth / (3 * columns + 1);
export const getColumns = (totalWidth, hexWidth) =>
  4 * totalWidth / (3 * hexWidth) - 1 / 3;

// Coordinate Conversion
export const cubeToAxial = ({ x, z }) => ({ q: x, r: (z + (x - x % 2)) / 2 });
export const axialToCube = ({ q, r }) => {
  const z = r - (q - q % 2) / 2;
  return { x: q, z: r, y: -q - z };
};

// Other Helpers
export const areNeighbors = (a, b) => {
  if (a.x % 2 === 1) {
    return (
      (Math.abs(a.x - b.x) <= 1 && [0, 1].indexOf(a.y - b.y) >= 0) ||
      (a.x === b.x && a.y === b.y - 1)
    );
  }
  return (
    (Math.abs(a.x - b.x) <= 1 && [0, 1].indexOf(b.y - a.y) >= 0) ||
    (a.x === b.x && a.y === b.y + 1)
  );
};

export const hexRound = ({ x, y, z }) => {
  let rx = Math.round(x);
  let ry = Math.round(y);
  let rz = Math.round(z);

  const xDiff = Math.abs(rx - x);
  const yDiff = Math.abs(ry - y);
  const zDiff = Math.abs(rz - z);

  if (xDiff > yDiff && xDiff > zDiff) {
    rx = -ry - rz;
  } else if (yDiff > zDiff) {
    ry = -rx - rz;
  } else {
    rz = -rx - ry;
  }

  return { x: rx, y: ry, z: rz };
};

export const pixelToHex = ({ x, y, width }) => {
  const size = width / 2;
  const q = x * 2 / 3 / size;
  const r = (-x / 3 + Math.sqrt(3) / 3 * y) / size;
  return cubeToAxial(hexRound(axialToCube({ q, r })));
};

export const getHexPoints = ({ width, xOffset, yOffset }) => {
  const radius = width / 2;
  const hexagon = [];

  for (let i = 0; i < 6; i += 1) {
    const pointOnCircle = i * Math.PI / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push({ x: x + xOffset, y: y + yOffset });
  }

  return hexagon;
};
