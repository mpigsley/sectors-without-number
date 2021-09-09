import { coordinateKey } from 'utils/common';
import {
  ROWS,
  COLUMNS,
  DEFAULT_HEX_WIDTH,
  HEX_PADDING,
  EXTRA_HEXES,
  PIXEL_BUFFER,
  MAX_HEXES,
} from 'constants/defaults';
import {
  toWidth,
  toHeight,
  getTotalHeight,
  getHexHeight,
  getRows,
  getTotalWidth,
  getHexWidth,
  getColumns,
} from 'utils/hex/common';

const getHexSize = ({ width, height, columns, rows, renderSector }) => {
  const modifiedBuffer = Math.min(PIXEL_BUFFER / (800 / width), PIXEL_BUFFER);
  const bufferedHeight = height - 2 * modifiedBuffer;
  const bufferedWidth = width - 2 * modifiedBuffer;
  let scaledWidth = DEFAULT_HEX_WIDTH;
  if (renderSector) {
    const pixelHeight = getHexHeight(bufferedHeight, rows);
    const pixelWidth = getHexWidth(bufferedWidth, columns);
    scaledWidth = Math.min(toWidth(pixelHeight), pixelWidth);
  }
  const scaledHeight = toHeight(scaledWidth);
  const totalHeight = getTotalHeight(scaledHeight, rows);
  const totalWidth = getTotalWidth(scaledWidth, columns);
  const scaledXBuffer = modifiedBuffer + (bufferedWidth - totalWidth) / 2;
  const scaledYBuffer = modifiedBuffer + (bufferedHeight - totalHeight) / 2;
  const widthUnit = scaledWidth / 4;
  const heightUnit = scaledHeight / 2;
  return {
    widthUnit,
    scaledWidth,
    scaledXBuffer,
    heightUnit,
    scaledHeight,
    scaledYBuffer,
  };
};

const getGridData = (
  { scaledWidth, scaledXBuffer, scaledHeight, scaledYBuffer },
  { rows, columns },
) => {
  const hexesInVertical = getRows(scaledYBuffer, scaledHeight);
  const paddedRows = Math.ceil(hexesInVertical) + EXTRA_HEXES;
  const extraHexYMultiplier = (EXTRA_HEXES * 2 + 1) / 2;
  const totalRows = rows + 2 * paddedRows;
  const yRemainder = Math.trunc(hexesInVertical);
  const scaledYOffset =
    (hexesInVertical - yRemainder) * scaledHeight -
    scaledHeight * extraHexYMultiplier;

  const hexesInHorizontal = getColumns(scaledXBuffer, scaledWidth);
  let paddedColumns = Math.ceil(hexesInHorizontal) + EXTRA_HEXES;
  const extraHexXMultiplier =
    ((paddedColumns % 2 ? EXTRA_HEXES + 1 : EXTRA_HEXES) * 2 + 1) / 4;
  paddedColumns = paddedColumns % 2 ? paddedColumns + 1 : paddedColumns;
  const totalColumns = columns + 2 * paddedColumns;
  const xRemainder = Math.trunc(hexesInHorizontal);
  const scaledXOffset =
    (hexesInHorizontal - xRemainder) * scaledWidth -
    scaledWidth * extraHexXMultiplier;

  return {
    paddedRows,
    totalRows,
    scaledYOffset,
    paddedColumns,
    totalColumns,
    scaledXOffset,
  };
};

const printableHexWidth = 200;
const printablePadding = 40;
const printableBorder = 3;
const getPrintableData = (hexes, { rows, columns }) => {
  const printableHexHeight = toHeight(printableHexWidth);
  const onlySector = hexes.filter((hex) => hex.highlighted) || [];
  const { width, height, xOffset, yOffset, i, j } =
    hexes.find((hex) => hex.hexKey === '0000') || {};
  const newTotalWidth =
    getTotalWidth(printableHexWidth, columns) +
    printablePadding * 2 +
    printableBorder * columns;
  const newTotalHeight =
    getTotalHeight(printableHexHeight, rows) +
    printablePadding * 2 +
    printableBorder * rows;
  return {
    viewbox: `0 0 ${newTotalWidth} ${newTotalHeight}`,
    hexes: onlySector.map((hex) => ({
      ...hex,
      width: printableHexWidth,
      height: printableHexHeight,
      xOffset:
        hex.xOffset -
        xOffset +
        (hex.j - j) *
          (printableHexWidth * 0.75 - width * 0.75 - printableBorder) +
        printableHexWidth / 2 +
        printablePadding,
      yOffset:
        hex.yOffset -
        yOffset +
        (hex.i - i) * (printableHexHeight - height - printableBorder) +
        ((hex.j - j) % 2 ? (printableHexHeight - height) / 2 : 0) +
        printableHexHeight / 2 +
        printablePadding,
    })),
  };
};

export default (config) => {
  if (config.width < 200 || config.height < 200) {
    return { hexes: [], printable: {} };
  }

  const isSmallWindow = config.width < 800 || config.height < 600;
  const newConfig = config.renderSector
    ? config
    : Object.assign(config, {
        rows: ROWS,
        columns: COLUMNS,
      });
  const hexSize = getHexSize(newConfig);
  const { widthUnit, scaledWidth, scaledHeight, heightUnit } = hexSize;
  const {
    paddedRows,
    totalRows,
    scaledYOffset,
    paddedColumns,
    totalColumns,
    scaledXOffset,
  } = getGridData(hexSize, newConfig);

  let hexes = [];
  let isWithinHeight = true;
  let isWithinWidth = true;
  let isLessThanMaximum = true;
  let i = 0;
  let j = 0;

  while (isWithinHeight && isLessThanMaximum) {
    const minRowHeight = heightUnit * 2 * i + scaledYOffset;
    while (isWithinWidth && isLessThanMaximum) {
      const xOffset = j * 3 * widthUnit + scaledXOffset;
      const hexKey = coordinateKey(j - paddedColumns + 1, i - paddedRows + 1);

      hexes.push({
        i,
        j,
        hexKey,
        width: scaledWidth - HEX_PADDING,
        height: scaledHeight - HEX_PADDING,
        xOffset,
        yOffset: j % 2 ? minRowHeight + heightUnit : minRowHeight,
        highlighted:
          config.renderSector &&
          i > paddedRows - 1 &&
          i < totalRows - paddedRows &&
          j > paddedColumns - 1 &&
          j < totalColumns - paddedColumns,
      });
      j += 1;
      isWithinWidth = j < totalColumns;
    }
    j = 0;
    i += 1;
    isWithinWidth = true;
    isWithinHeight = i < totalRows;
    isLessThanMaximum = hexes.length <= MAX_HEXES || !isSmallWindow;
  }

  hexes = isLessThanMaximum ? hexes : [];
  let printable = {};
  if (config.renderSector) {
    printable = getPrintableData(hexes, newConfig);
  }

  return { hexes, printable };
};
