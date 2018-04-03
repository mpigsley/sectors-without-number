import { getTopLevelEntity } from 'utils/entity';

const getHexPoints = ({ width, xOffset, yOffset }) => {
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

export default ({ ctx, ratio, hexes, entities }) => {
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
      ...getTopLevelEntity(entities, hex.hexKey),
    }))
    .map(hex => ({
      ...hex,
      points: getHexPoints(hex),
    }));

  hexEntities.forEach(({ points, highlighted }) => {
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
    ctx.stroke();
    ctx.fill();
  });

  hexEntities
    .filter(({ highlighted, width }) => highlighted && width > 45)
    .forEach(({ hexKey, entity, xOffset, yOffset, height }) => {
      // Draw Text
      ctx.font = `${9 * ratio}px Raleway,sans-serif`;
      ctx.fillStyle = '#8f8f8f';
      ctx.fillText(hexKey, xOffset - step * 5, yOffset + height / 2 - step * 2);
      if (entity) {
        ctx.fillText(
          entity.numChildren,
          xOffset - step,
          yOffset - height / 2 + step * 4,
        );
      }
    });
};
