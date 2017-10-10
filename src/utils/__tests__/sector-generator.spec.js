import sectorGenerator from '../sector-generator';
import { testSystems } from '../generator-data';

describe('SectorGenerator', () => {
  let config;
  beforeEach(() => {
    config = {
      columns: 8,
      rows: 10,
      seed: 'asdfghjkl',
      isBuilder: false,
    };
  });

  it('should have a randomly generated name', () => {
    const { name } = sectorGenerator(config);
    expect(name).toEqual('Edena Omega');
  });

  it('should pass the seed, rows, and columns through to the result', () => {
    const testSeed = 'lkjhgfdsa';
    const { seed, rows, columns } = sectorGenerator({
      ...config,
      seed: testSeed,
    });
    expect(seed).toEqual(testSeed);
    expect(rows).toEqual(10);
    expect(columns).toEqual(8);
  });

  it('should generate a sector full of systems from a seed', () => {
    const { systems } = sectorGenerator(config);
    expect(systems).toMatchObject(testSystems);
  });

  it('should generate a sector with no systems if it is initialized in builder mode', () => {
    const { systems } = sectorGenerator({ ...config, isBuilder: true });
    expect(systems).toEqual({});
  });
});
