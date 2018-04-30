import { getTopLevelEntity } from 'utils/entity';
import Entities from 'constants/entities';
import { getHexPoints } from 'utils/hex/common';
import { HEX_PADDING } from 'constants/defaults';

const getHexBoundingBox = ({ height, width, xOffset, yOffset }) => ({
  x1: xOffset - (width + HEX_PADDING) / 2,
  x2: xOffset + (width + HEX_PADDING) / 2,
  y1: yOffset - (height + HEX_PADDING) / 2,
  y2: yOffset + (height + HEX_PADDING) / 2,
});
const distanceBetween = (a, b) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
const isWithin = ({ x, y }, { x1, x2, y1, y2 }) =>
  x >= x1 && x <= x2 && y >= y1 && y <= y2;
export const getHoveredHex = ({ x, y, hexes }) => {
  const containedInBoundingBox = hexes.filter(
    hex => isWithin({ x, y }, getHexBoundingBox(hex)) && hex.highlighted,
  );
  if (!containedInBoundingBox.length) {
    return undefined;
  } else if (containedInBoundingBox.length === 1) {
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

const ARROW_SIZE = 10;
const drawArrowhead = (ctx, radians, x, y, ratio, isForward) => {
  const size = ARROW_SIZE * ratio;
  ctx.fillStyle = '#dbdbdb';
  ctx.lineWidth = 2;
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(radians);
  ctx.moveTo(0, 6 * (isForward ? -1 : 1));
  ctx.lineTo(size / 2, size * (isForward ? 1 : -1) + 6 * (isForward ? -1 : 1));
  ctx.lineTo(-size / 2, size * (isForward ? 1 : -1) + 6 * (isForward ? -1 : 1));
  ctx.closePath();
  ctx.restore();
  ctx.fill();
};

export default ({
  ctx,
  ratio,
  hexes,
  topLevelEntities,
  hoverKey,
  holdKey,
  activeKey,
  width,
  height,
}) => {
  ctx.clearRect(0, 0, width * ratio, height * ratio);

  const step = 2 * ratio;
  ctx.strokeStyle = '#283647';
  ctx.lineWidth = 2 * ratio;

  const hexEntities = hexes
    .map(hex => ({
      ...hex,
      xOffset: hex.xOffset * ratio,
      yOffset: hex.yOffset * ratio,
      width: hex.width * ratio,
      height: hex.height * ratio,
      ...getTopLevelEntity(topLevelEntities, hex.hexKey),
    }))
    .map(hex => ({
      ...hex,
      points: getHexPoints(hex),
    }));

  let holdLocation;
  let hoverLocation;
  let isVectorSwitch = false;

  hexEntities.forEach(
    ({ points, highlighted, hexKey, xOffset, yOffset, entity }) => {
      ctx.beginPath();
      const [first, ...rest] = points;
      ctx.moveTo(first.x, first.y);
      rest.forEach(({ x, y }) => {
        ctx.lineTo(x, y);
      });
      ctx.fillStyle = '#233142';
      if (highlighted) {
        ctx.fillStyle = '#303e4f';
      }
      if (hoverKey === hexKey) {
        ctx.fillStyle = '#863c4e';
      }
      if (activeKey === hexKey) {
        ctx.fillStyle = '#792f41';
      }
      if (holdKey === hexKey || (hoverKey === hexKey && holdKey)) {
        ctx.fillStyle = '#637182';
      }
      ctx.stroke();
      ctx.fill();

      if (hexKey === holdKey) {
        holdLocation = { x: xOffset, y: yOffset };
      }
      if (hexKey === hoverKey) {
        hoverLocation = { x: xOffset, y: yOffset };
        isVectorSwitch = !!entity;
      }
    },
  );

  if (holdLocation && hoverLocation && holdKey !== hoverKey) {
    const vectorRatio =
      (isVectorSwitch ? 16 : 10) / distanceBetween(holdLocation, hoverLocation);
    const xEnd =
      (1 - vectorRatio) * hoverLocation.x + vectorRatio * holdLocation.x;
    const yEnd =
      (1 - vectorRatio) * hoverLocation.y + vectorRatio * holdLocation.y;

    let xStart = holdLocation.x;
    let yStart = holdLocation.y;
    if (isVectorSwitch) {
      xStart =
        (1 - vectorRatio) * holdLocation.x + vectorRatio * hoverLocation.x;
      yStart =
        (1 - vectorRatio) * holdLocation.y + vectorRatio * hoverLocation.y;
    }

    // Draw Path
    ctx.strokeStyle = '#dbdbdb';
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();

    // Draw arrow heads
    let radians = Math.atan((yEnd - yStart) / (xEnd - xStart));
    radians += (xEnd >= xStart ? 90 : -90) * Math.PI / 180;
    drawArrowhead(ctx, radians, xEnd, yEnd, ratio, true);
    if (isVectorSwitch) {
      drawArrowhead(ctx, radians, xStart, yStart, ratio, false);
    }
  }

  hexEntities.filter(hex => hex.highlighted).forEach(hex => {
    // Draw Text
    ctx.font = `${9 * ratio}px Raleway,sans-serif`;
    ctx.fillStyle = '#8f8f8f';
    const renderText = hex.width > 45 * ratio;
    if (renderText) {
      ctx.fillText(
        hex.hexKey,
        hex.xOffset - step * 5,
        hex.yOffset + hex.height / 2 - step * 2,
      );
    }
    if (hex.entity) {
      if (renderText) {
        ctx.fillText(
          hex.entity.numChildren,
          hex.xOffset - step,
          hex.yOffset - hex.height / 2 + step * 4,
        );
      }
      ctx.fillStyle =
        hex.entityType === Entities.blackHole.key ? '#000000' : '#dbdbdb';
      ctx.beginPath();
      ctx.arc(hex.xOffset, hex.yOffset, hex.width / 13, 0, 2 * Math.PI);
      ctx.fill();
    }
  });
};
