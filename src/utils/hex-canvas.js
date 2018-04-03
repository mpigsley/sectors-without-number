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

export default ({ ctx, hexes, entities }) => {
  ctx.strokeStyle = '#283647';
  ctx.lineWidth = 2;

  const hexEntities = hexes.map(hex => ({
    ...hex,
    points: getHexPoints(hex),
    ...getTopLevelEntity(entities, hex.hexKey),
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
      ctx.font = '9px Raleway,sans-serif';
      ctx.fillStyle = '#8f8f8f';
      ctx.fillText(hexKey, xOffset - 10, yOffset + height / 2 - 4);
      if (entity) {
        ctx.fillText(entity.numChildren, xOffset - 2, yOffset - height / 2 + 8);
      }
    });
};
