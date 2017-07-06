const defaultHexWidth = 50;
const hexPadding = 2;

export default ({ width, height, columns, rows, renderSector }) => {
  const scaledWidth = Math.min(height / (rows + 4), width / (columns + 4));
  const horizHexOffset = Math.ceil((((width / scaledWidth) / (Math.sqrt(3) / 2)) - columns) / 2);
  const vertHexOffset = Math.ceil(((height / scaledWidth) - rows) / 2);
  const hexWidth = renderSector ? scaledWidth / (Math.sqrt(3) / 2) : defaultHexWidth;
  const hexWidthUnit = hexWidth / 4;
  const hexHeight = (Math.sqrt(3) / 2) * hexWidth;
  const hexHeightUnit = hexHeight / 2;
  const hexArray = [];
  let isWithinHeight = true;
  let isWithinWidth = true;
  let i = 0;
  let j = 0;

  while (isWithinHeight) {
    const minRowHeight = hexHeightUnit * 2 * i;
    while (isWithinWidth) {
      const xOffset = j * 3 * hexWidthUnit;
      hexArray.push({
        key: `${i}-${j}`,
        width: hexWidth - hexPadding,
        xOffset,
        yOffset: j % 2 ? minRowHeight + hexHeightUnit : minRowHeight,
        highlighted: renderSector
          && i > vertHexOffset && i < rows + vertHexOffset
          && j > horizHexOffset && j < columns + horizHexOffset,
      });
      j += 1;
      isWithinWidth = xOffset + (2 * hexWidthUnit) < width;
    }
    j = 0;
    i += 1;
    isWithinWidth = true;
    isWithinHeight = minRowHeight - hexHeightUnit < height;
  }

  return hexArray;
};
