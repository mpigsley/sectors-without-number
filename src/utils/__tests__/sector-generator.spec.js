import Chance from 'chance';
import { every } from 'lodash';

import sectorGenerator, { generatePlanet } from '../sector-generator';
import { worldTagKeys } from '../../constants/world-tags';
import Atmosphere from '../../constants/atmosphere';
import Temperature from '../../constants/temperature';
import Biosphere from '../../constants/biosphere';
import Population from '../../constants/population';

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
    expect(name).toBeDefined();
  });

  it('should pass the key, rows, and columns through to the result', () => {
    const testKey = 'lkjhgfdsa';
    const testName = 'The Outer Worlds';
    const { key, name, rows, columns } = sectorGenerator({
      ...config,
      key: testKey,
      name: testName,
    });
    expect(key).toEqual(testKey);
    expect(name).toEqual(testName);
    expect(rows).toEqual(10);
    expect(columns).toEqual(8);
  });

  it('should generate a sector with no systems if it is initialized in builder mode', () => {
    const { systems } = sectorGenerator({ ...config, isBuilder: true });
    expect(systems).toEqual({});
  });

  it('should have a minimum system count of at least row * columns / 4', () => {
    const { systems } = sectorGenerator(config);
    expect(
      Object.keys(systems).length >= config.rows * config.columns / 4,
    ).toBeTruthy();
  });

  it('should generate between one and three planets per system', () => {
    const { systems } = sectorGenerator(config);
    Object.values(systems).forEach(system => {
      const numPlanets = Object.keys(system.planets).length;
      expect(numPlanets >= 1).toBeTruthy();
      expect(numPlanets <= 3).toBeTruthy();
    });
  });

  describe('generatePlanet', () => {
    it('should include a random name', () => {
      const { name } = generatePlanet(new Chance())();
      expect(name).toBeDefined();
      expect(name.split(' ')).toHaveLength(1);
    });

    it('should include an encoded key', () => {
      const testName = 'VJLAE FLIAE%=';
      const { key } = generatePlanet(new Chance(), testName)();
      expect(key).toEqual(encodeURIComponent(testName.toLowerCase()));
    });

    it('should include world tags from list', () => {
      const { tags } = generatePlanet(new Chance())();
      expect(
        every(tags, tag => Object.keys(worldTagKeys).includes(tag)),
      ).toBeTruthy();
    });

    it('should include atmosphere from list', () => {
      const { atmosphere } = generatePlanet(new Chance())();
      expect(Object.keys(Atmosphere).includes(atmosphere)).toBeTruthy();
    });

    it('should include temperature from list', () => {
      const { temperature } = generatePlanet(new Chance())();
      expect(Object.keys(Temperature).includes(temperature)).toBeTruthy();
    });

    it('should include biosphere from list', () => {
      const { biosphere } = generatePlanet(new Chance())();
      expect(Object.keys(Biosphere).includes(biosphere)).toBeTruthy();
    });

    it('should include population from list', () => {
      const { population } = generatePlanet(new Chance())();
      expect(Object.keys(Population).includes(population)).toBeTruthy();
    });
  });
});
