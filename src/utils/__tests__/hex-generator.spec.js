import hexGenerator from '../hex-generator';
import sectorGenerator from '../sector-generator';

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
});
