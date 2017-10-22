import sectorGenerator from '../sector-generator';

describe('SectorGenerator', () => {
  let config;
  beforeEach(() => {
    config = {
      columns: 8,
      rows: 10,
      isBuilder: false,
    };
  });

  it('should have a randomly generated name', () => {
    const { name } = sectorGenerator(config);
    expect(name).toBeTruthy();
  });

  it('should pass the key, rows, and columns through to the result', () => {
    const testKey = 'lkjhgfdsa';
    const { key, rows, columns } = sectorGenerator({
      ...config,
      key: testKey,
    });
    expect(key).toEqual(testKey);
    expect(rows).toEqual(10);
    expect(columns).toEqual(8);
  });

  it('should generate a sector with no systems if it is initialized in builder mode', () => {
    const { systems } = sectorGenerator({ ...config, isBuilder: true });
    expect(systems).toEqual({});
  });
});
