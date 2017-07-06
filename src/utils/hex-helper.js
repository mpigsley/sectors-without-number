// eslint-disable-next-line
export const generateHexCoordinates = ({ width, height, hexWidth, hexPadding }) => {
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
