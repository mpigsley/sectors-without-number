import { coordinateKey } from 'utils/common';
import { ROWS, COLUMNS } from 'constants/defaults';

// Constants
const defaultHexWidth = 50; // Hex width when not rendering sector
const hexPadding = 2; // Pixels between hexes
const extraHexes = 1; // Extra hexes around canvas edges
const pixelBuffer = 75; // Pixel buffer between the sector and window
const maxHexes = 800; // Number of hexagons to render before this generator is short circuited

// Size Conversion
const sizeDiff = Math.sqrt(3) / 2;
const toWidth = height => height / sizeDiff;
const toHeight = width => width * sizeDiff;

// Height/Vertical Calculations
const getTotalHeight = (hexHeight, rows) => (rows + 1 / 2) * hexHeight;
const getHexHeight = (totalHeight, rows) => totalHeight / (rows + 1 / 2);
const getRows = (totalHeight, hexHeight) =>
  (totalHeight - 2 / hexHeight) / hexHeight;

// Width/Horizontal Calculations
const getTotalWidth = (hexWidth, columns) => hexWidth / 4 * (3 * columns + 1);
const getHexWidth = (totalWidth, columns) => 4 * totalWidth / (3 * columns + 1);
const getColumns = (totalWidth, hexWidth) =>
  4 * totalWidth / (3 * hexWidth) - 1 / 3;

// Helpers
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

const getHexSize = ({ width, height, columns, rows, renderSector }) => {
  const bufferedHeight = height - 2 * pixelBuffer;
  const bufferedWidth = width - 2 * pixelBuffer;
  let scaledWidth = defaultHexWidth;
  if (renderSector) {
    const pixelHeight = getHexHeight(bufferedHeight, rows);
    const pixelWidth = getHexWidth(bufferedWidth, columns);
    scaledWidth = Math.min(toWidth(pixelHeight), pixelWidth);
  }
  const scaledHeight = toHeight(scaledWidth);
  const totalHeight = getTotalHeight(scaledHeight, rows);
  const totalWidth = getTotalWidth(scaledWidth, columns);
  const scaledXBuffer = pixelBuffer + (bufferedWidth - totalWidth) / 2;
  const scaledYBuffer = pixelBuffer + (bufferedHeight - totalHeight) / 2;
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
  const paddedRows = Math.ceil(hexesInVertical) + extraHexes;
  const extraHexYMultiplier = (extraHexes * 2 + 1) / 2;
  const totalRows = rows + 2 * paddedRows;
  const yRemainder = Math.trunc(hexesInVertical);
  const scaledYOffset =
    (hexesInVertical - yRemainder) * scaledHeight -
    scaledHeight * extraHexYMultiplier;

  const hexesInHorizontal = getColumns(scaledXBuffer, scaledWidth);
  let paddedColumns = Math.ceil(hexesInHorizontal) + extraHexes;
  const extraHexXMultiplier =
    ((paddedColumns % 2 ? extraHexes + 1 : extraHexes) * 2 + 1) / 4;
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
  const onlySector = hexes.filter(hex => hex.highlighted) || [];
  const { width, height, xOffset, yOffset, i, j } =
    hexes.find(hex => hex.hexKey === '0000') || {};
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
    hexes: onlySector.map(hex => ({
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

export default config => {
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
        width: scaledWidth - hexPadding,
        height: scaledHeight - hexPadding,
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
    isLessThanMaximum = hexes.length <= maxHexes || !isSmallWindow;
  }

  hexes = isLessThanMaximum ? hexes : [];
  let printable = {};
  if (config.renderSector) {
    printable = getPrintableData(hexes, newConfig);
  }

  return { hexes, printable };
};
