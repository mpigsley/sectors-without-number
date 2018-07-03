import tinycolor from 'tinycolor2';

import { forEach, find, values, includes, uniq, keys } from 'constants/lodash';
import { getTopLevelEntity } from 'utils/entity';
import Entities from 'constants/entities';
import { getHexPoints } from 'utils/hex/common';
import { HEX_PADDING, TARGET_COLOR_WIDTH } from 'constants/defaults';

const NAVIGATION_WIDTHS = {
  thin: 1,
  normal: 2.5,
  wide: 5,
};

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
  isShared,
  sectorLayers,
  navigationRoutes,
  routeLocator,
  paintRegion,
  layerHexes,
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

  const allRouteKeys = values(navigationRoutes).reduce(
    (routeKeys, sectorNav) => uniq([...routeKeys, ...sectorNav.route]),
    [],
  );
  const routeLocations = {};
  const hexesWithDarkText = [];
  const newRoute = find(navigationRoutes, { isCreatingRoute: true });
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
      if (
        includes(keys(layerHexes), hexKey) ||
        (hoverKey === hexKey && paintRegion)
      ) {
        let hexLayer = layerHexes[hexKey] || [];
        if (
          hoverKey === hexKey &&
          paintRegion &&
          !includes(hexLayer, paintRegion.color)
        ) {
          hexLayer = [paintRegion.color, ...hexLayer];
        }

        const lightColors = hexLayer.reduce(
          (num, color) => num + tinycolor(color).getBrightness(),
          0,
        );
        if (lightColors / hexLayer.length >= 100) {
          hexesWithDarkText.push(hexKey);
        }

        if (hexLayer.length === 1) {
          const [fillStyle] = hexLayer;
          ctx.fillStyle = fillStyle;
        } else if (hexLayer.length > 1) {
          const gradient = ctx.createLinearGradient(
            points[1].x,
            points[1].y,
            points[4].x,
            points[4].y,
          );
          let numSteps = Math.round(
            distanceBetween(points[1], points[4]) / TARGET_COLOR_WIDTH,
          );
          numSteps = numSteps < hexLayer.length ? hexLayer.length : numSteps;
          const gStep = 1 / numSteps;
          console.log(gStep);
          for (let i = 0; i < numSteps; i += 1) {
            console.log(i, i % hexLayer.length);
            const color = hexLayer[i % hexLayer.length];
            gradient.addColorStop(gStep * i, color);
            const nextColor = hexLayer[(i + 1) % hexLayer.length];
            if (nextColor) {
              gradient.addColorStop(
                Math.min(gStep * (i + 1) - 0.001, 1),
                color,
              );
            }
          }
          ctx.fillStyle = gradient;
        }
      }
      if (newRoute && includes(newRoute.route, hexKey)) {
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
      if (includes(allRouteKeys, hexKey) && highlighted) {
        routeLocations[hexKey] = { x: xOffset, y: yOffset };
      }
    },
  );

  const renderNavigation =
    sectorLayers.navigation === undefined || sectorLayers.navigation;
  if (renderNavigation || newRoute) {
    forEach(navigationRoutes, (navRoute, routeId) => {
      if (navRoute.route.length < 2 || (isShared && navRoute.isHidden)) {
        return;
      }
      const isLocating = routeId === routeLocator;
      let lineWidth = NAVIGATION_WIDTHS[navRoute.width] * ratio;
      if (isLocating) {
        lineWidth = NAVIGATION_WIDTHS.wide * ratio;
        ctx.strokeStyle = 'red';
      } else {
        ctx.strokeStyle = navRoute.color;
      }
      if (navRoute.type === 'solid' || isLocating) {
        ctx.setLineDash([1, 0]);
      } else if (navRoute.type === 'dotted') {
        ctx.setLineDash([lineWidth, 12]);
      } else if (navRoute.type === 'short') {
        ctx.setLineDash([15, 15]);
      } else {
        ctx.setLineDash([35, 35]);
      }
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      navRoute.route.forEach((routeLocation, index) => {
        const { x, y } = routeLocations[routeLocation] || {};
        if (index) {
          ctx.lineTo(x, y);
        } else {
          ctx.moveTo(x, y);
        }
      });
      ctx.stroke();
    });
  }

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
    ctx.lineWidth = 2 * ratio;
    ctx.strokeStyle = '#dbdbdb';
    ctx.setLineDash([1, 0]);
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();

    // Draw arrow heads
    let radians = Math.atan((yEnd - yStart) / (xEnd - xStart));
    radians += ((xEnd >= xStart ? 90 : -90) * Math.PI) / 180;
    drawArrowhead(ctx, radians, xEnd, yEnd, ratio, true);
    if (isVectorSwitch) {
      drawArrowhead(ctx, radians, xStart, yStart, ratio, false);
    }
  }

  hexEntities.filter(hex => hex.highlighted).forEach(hex => {
    // Draw Text
    ctx.font = `${9 * ratio}px Raleway,sans-serif`;
    ctx.fillStyle = includes(hexesWithDarkText, hex.hexKey)
      ? '#000000'
      : '#b2b2b2';
    const renderText =
      hex.width > 45 * ratio &&
      (sectorLayers.systemText === undefined || sectorLayers.systemText);
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
