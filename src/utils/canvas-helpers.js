import { HEX_PADDING } from 'constants/defaults';

const getHexBoundingBox = ({ height, width, xOffset, yOffset }) => ({
  x1: xOffset - (width + HEX_PADDING) / 2,
  x2: xOffset + (width + HEX_PADDING) / 2,
  y1: yOffset - (height + HEX_PADDING) / 2,
  y2: yOffset + (height + HEX_PADDING) / 2,
});
export const distanceBetween = (a, b) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
const isWithin = ({ x, y }, { x1, x2, y1, y2 }) =>
  x >= x1 && x <= x2 && y >= y1 && y <= y2;

export const getHoveredHex = ({ x, y, hexes }) => {
  const containedInBoundingBox = hexes.filter(
    hex => isWithin({ x, y }, getHexBoundingBox(hex)) && hex.highlighted,
  );
  if (!containedInBoundingBox.length) {
    return undefined;
  }
  if (containedInBoundingBox.length === 1) {
    return containedInBoundingBox[0].hexKey;
  }
  return containedInBoundingBox.reduce(
    (minVal, hex) => {
      const distance = distanceBetween(
        { x, y },
        { x: hex.xOffset, y: hex.yOffset },
      );
      return distance < minVal.distance
        ? { hexKey: hex.hexKey, distance }
        : minVal;
    },
    { distance: Number.MAX_SAFE_INTEGER },
  ).hexKey;
};

export const getPixelRatio = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;
  return dpr / bsr;
};
