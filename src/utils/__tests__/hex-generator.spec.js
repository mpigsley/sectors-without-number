import hexGenerator from '../hex-generator';
import sectorGenerator from '../sector-generator';
import {
  testHexes,
  testPrintable,
  testNonSectorHexes,
} from '../generator-data';

describe('HexGenerator', () => {
  let config;
  beforeEach(() => {
    const { systems, rows, columns } = sectorGenerator({
      columns: 8,
      rows: 10,
    });
    config = {
      renderSector: true,
      height: 1000,
      width: 800,
      systems,
      rows,
      columns,
    };
  });

  it('should short circuit given a width less than 200', () => {
    const { hexes, printable } = hexGenerator({ ...config, width: 150 });
    expect(hexes).toHaveLength(0);
    expect(printable).toMatchObject({});
  });

  it('should short circuit given a height less than 200', () => {
    const { hexes, printable } = hexGenerator({ ...config, height: 150 });
    expect(hexes).toHaveLength(0);
    expect(printable).toMatchObject({});
  });

  it('should short circuit when more than 800 hexes are rendered', () => {
    const { hexes, printable } = hexGenerator({ ...config, height: 202 });
    expect(hexes).toHaveLength(0);
    expect(printable).toMatchObject({});
  });

  it('should generate hexes given a generated sector', () => {
    const { hexes } = hexGenerator(config);
    expect(hexes).toMatchObject(testHexes);
  });

  it('should generate a printable given a generated sector', () => {
    const { printable } = hexGenerator(config);
    expect(printable).toMatchObject(testPrintable);
  });

  it('should generate non sector hexes if that option is set to false', () => {
    const { hexes } = hexGenerator({
      ...config,
      renderSector: false,
      systems: undefined,
    });
    expect(hexes).toMatchObject(testNonSectorHexes);
  });
});
