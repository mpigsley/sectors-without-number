import { validateImport } from '../import-validator';

// ─── Minimal valid fixtures ───────────────────────────────────────────────────

const SECTOR_ID = 'sector-1';
const SYSTEM_ID = 'system-1';
const PLANET_ID = 'planet-1';
const FACTION_ID = 'faction-1';

function validSector(overrides) {
  return {
    [SECTOR_ID]: {
      name: 'Alpha Sector',
      rows: 10,
      columns: 10,
      ...overrides,
    },
  };
}

function validSystem(overrides) {
  return {
    [SYSTEM_ID]: {
      name: 'Sol',
      parent: SECTOR_ID,
      parentEntity: 'sector',
      sector: SECTOR_ID,
      x: 0,
      y: 0,
      attributes: { tags: [] },
      ...overrides,
    },
  };
}

function validPlanet(overrides) {
  return {
    [PLANET_ID]: {
      name: 'Earth',
      parent: SYSTEM_ID,
      parentEntity: 'system',
      sector: SECTOR_ID,
      attributes: {
        tags: [],
        atmosphere: 'breathable',
        temperature: 'temperate',
        biosphere: 'humanMiscible',
        population: 'billions',
        techLevel: 'TL4',
      },
      ...overrides,
    },
  };
}

function minimalValidPayload(extra) {
  return {
    sector: validSector(),
    system: validSystem(),
    planet: validPlanet(),
    routes: {},
    layers: {},
    factions: {},
    ...extra,
  };
}

// ─── Phase 1 ─────────────────────────────────────────────────────────────────

describe('validateImport — Phase 1: top-level structure', () => {
  it('rejects null', () => {
    const { valid, errors } = validateImport(null);
    expect(valid).toBe(false);
    expect(errors[0].field).toBe('root');
  });

  it('rejects a string', () => {
    const { valid } = validateImport('{"sector":{}}');
    expect(valid).toBe(false);
  });

  it('rejects missing sector key', () => {
    const { valid, errors } = validateImport({ system: {} });
    expect(valid).toBe(false);
    expect(errors[0].field).toBe('sector');
  });

  it('rejects empty sector object', () => {
    const { valid } = validateImport({ sector: {} });
    expect(valid).toBe(false);
  });

  it('rejects non-object routes', () => {
    const { errors } = validateImport({ ...minimalValidPayload(), routes: [] });
    expect(errors.some(e => e.field === 'routes')).toBe(true);
  });

  it('accepts missing optional keys (routes, layers, factions)', () => {
    const { valid } = validateImport({ sector: validSector(), system: validSystem() });
    expect(valid).toBe(true);
  });
});

// ─── Phase 2 ─────────────────────────────────────────────────────────────────

describe('validateImport — Phase 2: schema validation', () => {
  describe('sector', () => {
    it('rejects missing name', () => {
      const { errors } = validateImport({
        sector: { [SECTOR_ID]: { rows: 10, columns: 10 } },
      });
      expect(errors.some(e => e.entityId === SECTOR_ID && e.field === 'name')).toBe(true);
    });

    it('rejects non-integer rows', () => {
      const { errors } = validateImport({
        sector: { [SECTOR_ID]: { name: 'X', rows: 1.5, columns: 10 } },
      });
      expect(errors.some(e => e.field === 'rows')).toBe(true);
    });

    it('rejects zero columns', () => {
      const { errors } = validateImport({
        sector: { [SECTOR_ID]: { name: 'X', rows: 10, columns: 0 } },
      });
      expect(errors.some(e => e.field === 'columns')).toBe(true);
    });

    it('rejects a sector with a parent', () => {
      const { errors } = validateImport({
        sector: { [SECTOR_ID]: { name: 'X', rows: 10, columns: 10, parent: 'some-id' } },
      });
      expect(errors.some(e => e.field === 'parent')).toBe(true);
    });
  });

  describe('non-sector entities', () => {
    it('rejects missing parent', () => {
      const { errors } = validateImport({
        sector: validSector(),
        system: {
          [SYSTEM_ID]: { name: 'Sol', parentEntity: 'sector', sector: SECTOR_ID, x: 0, y: 0 },
        },
      });
      expect(errors.some(e => e.entityId === SYSTEM_ID && e.field === 'parent')).toBe(true);
    });

    it('rejects unknown parentEntity type', () => {
      const { errors } = validateImport({
        sector: validSector(),
        system: {
          [SYSTEM_ID]: {
            name: 'Sol',
            parent: SECTOR_ID,
            parentEntity: 'unicorn',
            sector: SECTOR_ID,
            x: 0,
            y: 0,
          },
        },
      });
      expect(errors.some(e => e.field === 'parentEntity')).toBe(true);
    });

    it('rejects missing x/y on a system', () => {
      const { errors } = validateImport({
        sector: validSector(),
        system: {
          [SYSTEM_ID]: { name: 'Sol', parent: SECTOR_ID, parentEntity: 'sector', sector: SECTOR_ID },
        },
      });
      expect(errors.some(e => e.field === 'x')).toBe(true);
      expect(errors.some(e => e.field === 'y')).toBe(true);
    });
  });

  describe('planet attributes', () => {
    it('accepts all valid planet attribute values', () => {
      const { valid } = validateImport(minimalValidPayload());
      expect(valid).toBe(true);
    });

    it('rejects an invalid atmosphere value', () => {
      const { errors } = validateImport(
        minimalValidPayload({
          planet: validPlanet({ attributes: { atmosphere: 'chocolate' } }),
        }),
      );
      expect(errors.some(e => e.field === 'attributes.atmosphere')).toBe(true);
    });

    it('rejects an invalid techLevel value', () => {
      const { errors } = validateImport(
        minimalValidPayload({
          planet: validPlanet({ attributes: { techLevel: 'TL99' } }),
        }),
      );
      expect(errors.some(e => e.field === 'attributes.techLevel')).toBe(true);
    });

    it('accepts absent optional attributes', () => {
      const { valid } = validateImport(
        minimalValidPayload({
          planet: validPlanet({ attributes: {} }),
        }),
      );
      expect(valid).toBe(true);
    });

    it('flags unknown world tag keys on a planet', () => {
      const { errors } = validateImport(
        minimalValidPayload({
          planet: validPlanet({ attributes: { tags: ['notARealTag'] } }),
        }),
      );
      expect(errors.some(e => e.field.startsWith('attributes.tags'))).toBe(true);
    });
  });

  describe('routes', () => {
    it('rejects empty route array', () => {
      const { errors } = validateImport(
        minimalValidPayload({ routes: { 'r-1': { route: [] } } }),
      );
      expect(errors.some(e => e.entityId === 'r-1' && e.field === 'route')).toBe(true);
    });

    it('rejects route point missing y', () => {
      const { errors } = validateImport(
        minimalValidPayload({ routes: { 'r-1': { route: [{ x: 0 }] } } }),
      );
      expect(errors.some(e => e.entityId === 'r-1')).toBe(true);
    });
  });

  describe('factions', () => {
    it('rejects unknown faction goal', () => {
      const { errors } = validateImport(
        minimalValidPayload({
          factions: { [FACTION_ID]: { name: 'The Guild', goal: 'worldDomination' } },
        }),
      );
      expect(errors.some(e => e.entityId === FACTION_ID && e.field === 'goal')).toBe(true);
    });

    it('rejects unknown faction tag', () => {
      const { errors } = validateImport(
        minimalValidPayload({
          factions: { [FACTION_ID]: { name: 'The Guild', tags: ['rogue'] } },
        }),
      );
      expect(errors.some(e => e.field.startsWith('tags'))).toBe(true);
    });

    it('rejects unknown faction asset key', () => {
      const { errors } = validateImport(
        minimalValidPayload({
          factions: {
            [FACTION_ID]: {
              name: 'The Guild',
              assets: { madeUpAsset: { type: 'facility', hitPoints: 5 } },
            },
          },
        }),
      );
      expect(errors.some(e => e.field.startsWith('assets.madeUpAsset'))).toBe(true);
    });
  });
});

// ─── Phase 3 ─────────────────────────────────────────────────────────────────

describe('validateImport — Phase 3: ID-reference graph', () => {
  it('rejects a parent ID not present in the import', () => {
    const { errors } = validateImport({
      sector: validSector(),
      system: {
        [SYSTEM_ID]: {
          name: 'Sol',
          parent: 'ghost-id',
          parentEntity: 'sector',
          sector: SECTOR_ID,
          x: 0,
          y: 0,
        },
      },
    });
    expect(errors.some(e => e.entityId === SYSTEM_ID && e.field === 'parent')).toBe(true);
  });

  it('rejects a parentEntity mismatch', () => {
    const { errors } = validateImport({
      sector: validSector(),
      system: validSystem(),
      planet: {
        [PLANET_ID]: {
          name: 'Earth',
          parent: SYSTEM_ID,
          parentEntity: 'sector', // wrong: system's type is 'system', not 'sector'
          sector: SECTOR_ID,
          attributes: {},
        },
      },
    });
    expect(errors.some(e => e.entityId === PLANET_ID && e.field === 'parentEntity')).toBe(true);
  });

  it('rejects an illegal parent-child type pair', () => {
    // A system cannot be the child of a planet.
    const { errors } = validateImport({
      sector: validSector(),
      system: {
        'system-bad': {
          name: 'Bad',
          parent: PLANET_ID,
          parentEntity: 'planet',
          sector: SECTOR_ID,
          x: 1,
          y: 1,
        },
      },
      planet: validPlanet(),
    });
    expect(
      errors.some(e => e.entityId === 'system-bad' && e.field === 'parent'),
    ).toBe(true);
  });

  it('rejects a duplicate entity ID across buckets', () => {
    const shared = 'shared-id';
    const { errors } = validateImport({
      sector: validSector(),
      system: { [shared]: { name: 'Sol', parent: SECTOR_ID, parentEntity: 'sector', sector: SECTOR_ID, x: 0, y: 0 } },
      planet: { [shared]: { name: 'Earth', parent: shared, parentEntity: 'system', sector: SECTOR_ID, attributes: {} } },
    });
    expect(errors.some(e => e.field === 'id')).toBe(true);
  });

  it('rejects more than one sector in the import', () => {
    const { errors } = validateImport({
      sector: {
        'sec-1': { name: 'A', rows: 10, columns: 10 },
        'sec-2': { name: 'B', rows: 10, columns: 10 },
      },
    });
    expect(errors.some(e => e.field === 'sector')).toBe(true);
  });

  it('rejects an entity whose sector field does not match the import sector', () => {
    const { errors } = validateImport({
      sector: validSector(),
      system: {
        [SYSTEM_ID]: {
          name: 'Sol',
          parent: SECTOR_ID,
          parentEntity: 'sector',
          sector: 'some-other-sector',
          x: 0,
          y: 0,
        },
      },
    });
    expect(errors.some(e => e.field === 'sector')).toBe(true);
  });

  it('detects a circular parent chain', () => {
    const A = 'node-a';
    const B = 'node-b';
    const { errors } = validateImport({
      sector: validSector(),
      planet: {
        [A]: { name: 'A', parent: B, parentEntity: 'planet', sector: SECTOR_ID, attributes: {} },
        [B]: { name: 'B', parent: A, parentEntity: 'planet', sector: SECTOR_ID, attributes: {} },
      },
    });
    expect(errors.some(e => e.message.includes('circular'))).toBe(true);
  });

  it('rejects a faction homeworld ID not in the import', () => {
    const { errors } = validateImport(
      minimalValidPayload({
        factions: {
          [FACTION_ID]: {
            name: 'The Guild',
            homeworld: 'ghost-planet',
            homeworldEntity: 'planet',
          },
        },
      }),
    );
    expect(
      errors.some(e => e.entityId === FACTION_ID && e.field === 'homeworld'),
    ).toBe(true);
  });

  it('rejects a faction homeworldEntity mismatch', () => {
    const { errors } = validateImport(
      minimalValidPayload({
        factions: {
          [FACTION_ID]: {
            name: 'The Guild',
            homeworld: PLANET_ID,
            homeworldEntity: 'moon', // wrong: PLANET_ID is a planet
          },
        },
      }),
    );
    expect(
      errors.some(e => e.entityId === FACTION_ID && e.field === 'homeworldEntity'),
    ).toBe(true);
  });

  it('rejects a faction asset location not in the import', () => {
    const { errors } = validateImport(
      minimalValidPayload({
        factions: {
          [FACTION_ID]: {
            name: 'The Guild',
            assets: {
              militiaUnits: { type: 'militaryUnit', location: 'ghost-entity', locationEntity: 'planet' },
            },
          },
        },
      }),
    );
    expect(
      errors.some(e => e.field.includes('location') && e.field.includes('militiaUnits')),
    ).toBe(true);
  });
});

// ─── Phase 4 ─────────────────────────────────────────────────────────────────

describe('validateImport — Phase 4: coordinate bounds', () => {
  it('rejects a system outside sector columns', () => {
    const { errors } = validateImport({
      sector: validSector(),
      system: {
        [SYSTEM_ID]: {
          name: 'Far Out',
          parent: SECTOR_ID,
          parentEntity: 'sector',
          sector: SECTOR_ID,
          x: 99,
          y: 0,
        },
      },
    });
    expect(errors.some(e => e.entityId === SYSTEM_ID && e.field === 'x')).toBe(true);
  });

  it('rejects a system outside sector rows', () => {
    const { errors } = validateImport({
      sector: validSector(),
      system: {
        [SYSTEM_ID]: {
          name: 'Far Out',
          parent: SECTOR_ID,
          parentEntity: 'sector',
          sector: SECTOR_ID,
          x: 0,
          y: 99,
        },
      },
    });
    expect(errors.some(e => e.entityId === SYSTEM_ID && e.field === 'y')).toBe(true);
  });

  it('rejects two entities sharing the same hex', () => {
    const { errors } = validateImport({
      sector: validSector(),
      system: {
        'sys-a': {
          name: 'A',
          parent: SECTOR_ID,
          parentEntity: 'sector',
          sector: SECTOR_ID,
          x: 3,
          y: 3,
        },
        'sys-b': {
          name: 'B',
          parent: SECTOR_ID,
          parentEntity: 'sector',
          sector: SECTOR_ID,
          x: 3,
          y: 3,
        },
      },
    });
    expect(errors.some(e => e.field === 'x/y')).toBe(true);
  });

  it('rejects a route point outside bounds', () => {
    const { errors } = validateImport(
      minimalValidPayload({
        routes: { 'r-1': { route: [{ x: 0, y: 0 }, { x: 50, y: 50 }] } },
      }),
    );
    expect(errors.some(e => e.entityId === 'r-1')).toBe(true);
  });

  it('rejects a layer hex outside bounds', () => {
    const { errors } = validateImport(
      minimalValidPayload({
        layers: {
          'layer-1': {
            name: 'Core',
            regions: { 'region-1': { name: 'Core', color: '#fff', hexes: [{ x: 0, y: 100 }] } },
          },
        },
      }),
    );
    expect(errors.some(e => e.entityId === 'layer-1')).toBe(true);
  });
});

// ─── Happy-path smoke test ────────────────────────────────────────────────────

describe('validateImport — happy path', () => {
  it('passes a fully valid payload', () => {
    const { valid, errors } = validateImport(minimalValidPayload());
    expect(errors).toEqual([]);
    expect(valid).toBe(true);
  });

  it('passes a payload with a valid faction referencing an existing entity', () => {
    const payload = minimalValidPayload({
      factions: {
        [FACTION_ID]: {
          name: 'The Guild',
          goal: 'commercial',
          tags: ['traders'],
          homeworld: PLANET_ID,
          homeworldEntity: 'planet',
          assets: {
            militiaUnits: {
              type: 'militaryUnit',
              hitPoints: 6,
              location: PLANET_ID,
              locationEntity: 'planet',
              stealthed: false,
            },
          },
        },
      },
    });
    // 'traders' is not a FACTION_TAG, so we expect exactly one tag error
    const { errors } = validateImport(payload);
    expect(errors.filter(e => e.entityId === FACTION_ID && e.field === 'tags[0]').length).toBe(1);
    // Everything else should be clean
    expect(errors.filter(e => e.entityId === FACTION_ID && e.field !== 'tags[0]')).toEqual([]);
  });
});
