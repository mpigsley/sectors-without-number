// Constants
const defaultHexWidth = 50; // Hex width when not rendering sector
const defaultRows = 10; // Align with SWN rules
const defaultColumns = 8; // Align with SWN rules
const hexPadding = 3; // Pixels between Hexes
const extraHexes = 1; // Extra hexes around canvas edges
const pixelBuffer = 100; // Pixel buffer between the sector and window

// Size Conversion
const sizeDiff = Math.sqrt(3) / 2;
const toWidth = height => height / sizeDiff;
const toHeight = width => width * sizeDiff;

// Height/Vertical Calculations
const getTotalHeight = (hexHeight, rows) => (rows + (1 / 2)) * hexHeight;
const getHexHeight = (totalHeight, rows) => totalHeight / (rows + (1 / 2));
const getRows = (totalHeight, hexHeight) => (totalHeight - (2 / hexHeight)) / hexHeight;

// Width/Horizontal Calculations
const getTotalWidth = (hexWidth, columns) => (hexWidth / 4) * ((3 * columns) + 1);
const getHexWidth = (totalWidth, columns) => (4 * totalWidth) / ((3 * columns) + 1);
const getColumns = (totalWidth, hexWidth) => ((4 * totalWidth) / (3 * hexWidth)) - (1 / 3);

const getHexSize = ({ width, height, columns, rows, renderSector }) => {
  const bufferedHeight = height - (2 * pixelBuffer);
  const bufferedWidth = width - (2 * pixelBuffer);
  let scaledWidth = defaultHexWidth;
  if (renderSector) {
    const pixelHeight = getHexHeight(bufferedHeight, rows);
    const pixelWidth = getHexWidth(bufferedWidth, columns);
    scaledWidth = Math.min(toWidth(pixelHeight), pixelWidth);
  }
  const scaledHeight = toHeight(scaledWidth);
  const totalHeight = getTotalHeight(scaledHeight, rows);
  const totalWidth = getTotalWidth(scaledWidth, columns);
  const scaledXBuffer = pixelBuffer + ((bufferedWidth - totalWidth) / 2);
  const scaledYBuffer = pixelBuffer + ((bufferedHeight - totalHeight) / 2);
  const widthUnit = scaledWidth / 4;
  const heightUnit = scaledHeight / 2;
  return { widthUnit, scaledWidth, scaledXBuffer, heightUnit, scaledHeight, scaledYBuffer };
};

const getGridData = ({
  scaledWidth,
  scaledXBuffer,
  scaledHeight,
  scaledYBuffer,
}, {
  rows,
  columns,
}) => {
  const hexesInVertical = getRows(scaledYBuffer, scaledHeight);
  const paddedRows = Math.ceil(hexesInVertical) + extraHexes;
  const extraHexYMultiplier = ((extraHexes * 2) + 1) / 2;
  const totalRows = rows + (2 * paddedRows);
  const yRemainder = Math.trunc(hexesInVertical);
  const scaledYOffset = ((hexesInVertical - yRemainder) * scaledHeight)
    - (scaledHeight * extraHexYMultiplier);

  const hexesInHorizontal = getColumns(scaledXBuffer, scaledWidth);
  let paddedColumns = Math.ceil(hexesInHorizontal) + extraHexes;
  const extraHexXMultiplier = (((paddedColumns % 2 ? extraHexes + 1 : extraHexes) * 2) + 1) / 4;
  paddedColumns = paddedColumns % 2 ? paddedColumns + 1 : paddedColumns;
  const totalColumns = columns + (2 * paddedColumns);
  const xRemainder = Math.trunc(hexesInHorizontal);
  const scaledXOffset = ((hexesInHorizontal - xRemainder) * scaledWidth)
    - (scaledWidth * extraHexXMultiplier);

  return { paddedRows, totalRows, scaledYOffset, paddedColumns, totalColumns, scaledXOffset };
};

export default (config) => {
  const { renderSector, stars } = config;
  const newConfig = renderSector ? config : Object.assign(config, {
    rows: defaultRows,
    columns: defaultColumns,
  });
  const hexSize = getHexSize(newConfig);
  const { widthUnit, scaledWidth, heightUnit } = hexSize;
  const { paddedRows, totalRows, scaledYOffset,
    paddedColumns, totalColumns, scaledXOffset } = getGridData(hexSize, newConfig);

  const hexArray = [];
  let isWithinHeight = true;
  let isWithinWidth = true;
  let i = 0;
  let j = 0;

  const hasStar = (x, y) => stars
    .filter(s => s.location.x === x && s.location.y === y).length !== 0;

  while (isWithinHeight) {
    const minRowHeight = (heightUnit * 2 * i) + scaledYOffset;
    while (isWithinWidth) {
      const xOffset = (j * 3 * widthUnit) + scaledXOffset;
      hexArray.push({
        key: `${i}-${j}`,
        hasStar: renderSector && hasStar((i - paddedRows) + 1, (j - paddedColumns) + 1),
        width: scaledWidth - hexPadding,
        xOffset,
        yOffset: j % 2 ? minRowHeight + heightUnit : minRowHeight,
        highlighted: renderSector
          && i > paddedRows - 1 && i < totalRows - paddedRows
          && j > paddedColumns - 1 && j < totalColumns - paddedColumns,
      });
      j += 1;
      isWithinWidth = j < totalColumns;
    }
    j = 0;
    i += 1;
    isWithinWidth = true;
    isWithinHeight = i < totalRows;
  }

  return hexArray;
};
