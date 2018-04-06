import { getTopLevelEntity } from 'utils/entity';
import Entities from 'constants/entities';
import { getHexPoints, pixelToHex } from 'utils/hex/common';

export const hexFromHover = ({ x, y, width }) => {
  const hex = pixelToHex({ x, y, width });
  console.log(hex);
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
    .forEach(
      ({ hexKey, entity, entityType, xOffset, yOffset, height, width }) => {
        // Draw Text
        ctx.font = `${9 * ratio}px Raleway,sans-serif`;
        ctx.fillStyle = '#8f8f8f';
        ctx.fillText(
          hexKey,
          xOffset - step * 5,
          yOffset + height / 2 - step * 2,
        );
        if (entity) {
          ctx.fillText(
            entity.numChildren,
            xOffset - step,
            yOffset - height / 2 + step * 4,
          );
          ctx.fillStyle =
            entityType === Entities.blackHole.key ? '#000000' : '#dbdbdb';
          ctx.beginPath();
          ctx.arc(xOffset, yOffset, width / 13, 0, 2 * Math.PI);
          ctx.fill();
        }
      },
    );

  return { hexWidth: (hexes[0] || {}).width };
};
