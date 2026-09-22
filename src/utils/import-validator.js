import Entities from 'constants/entities';
import {
  FACTION_GOALS,
  FACTION_TAGS,
  FACTION_ASSET_TYPES,
  FACTION_ASSETS,
} from 'constants/faction';
import { worldTagKeys } from 'constants/world-tags';

// Matches the ENTITY_TYPES list in functions/src/save-entities.js — the set the
// Cloud Function will actually persist. Excludes extraneous types (layer,
// navigation, settings) that live in separate Firestore collections.
const IMPORTABLE_ENTITY_TYPES = new Set([
  'asteroidBase',
  'asteroidBelt',
  'blackHole',
  'deepSpaceStation',
  'gasGiantMine',
  'moon',
  'moonBase',
  'note',
  'orbitalRuin',
  'planet',
  'refuelingStation',
  'researchBase',
  'sector',
  'spaceStation',
  'system',
]);

// ALLOWED_CHILDREN[parentType] = Set<childType>
// Derived directly from the `children` arrays in constants/entities.js so this
// matrix never drifts from the authoritative definition.
const ALLOWED_CHILDREN = {};
for (const typeKey of IMPORTABLE_ENTITY_TYPES) {
  ALLOWED_CHILDREN[typeKey] = new Set(
    (Entities[typeKey] && Entities[typeKey].children) || [],
  );
}

// ATTR_VALIDATORS[entityType][attrKey] = Set<validRawValueKey>
// Built from the `attributes` arrays in constants/entities.js. Each entry in
// that array is an attribute definition (e.g. Atmosphere) with a `.key` name and
// a `.attributes` object whose keys are the valid raw values (e.g. 'breathable').
// An *empty* Set means the attribute exists on the type but has no valid values
// (emptyOccupation / emptySituation) — any stored value would be invalid.
const ATTR_VALIDATORS = {};
for (const typeKey of IMPORTABLE_ENTITY_TYPES) {
  ATTR_VALIDATORS[typeKey] = {};
  const attrDefs = (Entities[typeKey] && Entities[typeKey].attributes) || [];
  for (const def of attrDefs) {
    if (def && def.key && def.attributes) {
      ATTR_VALIDATORS[typeKey][def.key] = new Set(Object.keys(def.attributes));
    }
  }
}

const VALID_WORLD_TAG_KEYS = new Set(Object.keys(worldTagKeys));
const VALID_FACTION_GOAL_KEYS = new Set(Object.keys(FACTION_GOALS));
const VALID_FACTION_TAG_KEYS = new Set(Object.keys(FACTION_TAGS));
const VALID_FACTION_ASSET_TYPE_VALUES = new Set(Object.keys(FACTION_ASSET_TYPES));
const VALID_FACTION_ASSET_KEYS = new Set(Object.keys(FACTION_ASSETS));

// ─── Tiny helpers ────────────────────────────────────────────────────────────

function mkError(entityId, entityName, field, message) {
  return { entityId: entityId || null, entityName: entityName || null, field, message };
}

function isStr(v) {
  return typeof v === 'string';
}
function isNonEmptyStr(v) {
  return isStr(v) && v.trim().length > 0;
}
function isObj(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}
function isInt(v) {
  return typeof v === 'number' && Number.isInteger(v);
}

// ─── Phase 1: Top-level structure ────────────────────────────────────────────
// Cheap structural checks that guard everything downstream.

function validateTopLevel(json, errors) {
  if (!isObj(json)) {
    errors.push(mkError(null, null, 'root', 'Import payload must be a JSON object'));
    return false;
  }

  const sectorBucket = json.sector;
  if (!isObj(sectorBucket) || Object.keys(sectorBucket).length === 0) {
    errors.push(
      mkError(null, null, 'sector', 'Import must contain a non-empty "sector" object'),
    );
    return false;
  }

  for (const key of ['routes', 'layers', 'factions']) {
    if (json[key] != null && !isObj(json[key])) {
      errors.push(mkError(null, null, key, `"${key}" must be an object`));
    }
  }

  return true;
}

// ─── Phase 2: Per-entity / per-document schema validation ────────────────────
// Validates each document in isolation — no cross-references yet.

function validateSectorEntity(id, entity, errors) {
  const add = (f, m) => errors.push(mkError(id, entity.name, f, m));
  if (!isNonEmptyStr(entity.name)) add('name', 'must be a non-empty string');
  if (!isInt(entity.rows) || entity.rows < 1) add('rows', 'must be a positive integer');
  if (!isInt(entity.columns) || entity.columns < 1) add('columns', 'must be a positive integer');
  if (entity.parent != null) add('parent', 'sector must not have a parent');
}

function validateEntityAttributes(id, name, typeKey, attributes, errors) {
  const add = (f, m) => errors.push(mkError(id, name, f, m));
  if (!isObj(attributes)) {
    add('attributes', 'must be an object');
    return;
  }

  // Validate each enum attribute defined for this entity type.
  const validAttrs = ATTR_VALIDATORS[typeKey] || {};
  for (const [attrKey, validValues] of Object.entries(validAttrs)) {
    const value = attributes[attrKey];
    if (value == null) continue; // absent or null → attribute is optional
    if (!isStr(value)) {
      add(`attributes.${attrKey}`, 'must be a string');
    } else if (validValues.size > 0 && !validValues.has(value)) {
      add(`attributes.${attrKey}`, `"${value}" is not a valid ${attrKey} value`);
    } else if (validValues.size === 0) {
      // emptyOccupation / emptySituation: no valid values exist for this type
      add(`attributes.${attrKey}`, `${attrKey} has no valid values for entity type "${typeKey}"`);
    }
  }

  // Tags are validated as non-empty strings; world-tag key validation applies
  // only to planet (the one type with a defined tag registry). Custom tags are
  // stored as arbitrary strings so they cannot be validated without the custom
  // tags registry, which is not available in a pure JSON validator.
  if (attributes.tags !== undefined) {
    if (!Array.isArray(attributes.tags)) {
      add('attributes.tags', 'must be an array');
    } else {
      attributes.tags.forEach((tag, i) => {
        if (!isNonEmptyStr(tag)) {
          add(`attributes.tags[${i}]`, 'each tag must be a non-empty string');
        } else if (typeKey === 'planet' && !VALID_WORLD_TAG_KEYS.has(tag)) {
          // Flag unknown tags on planets. May be custom tags — treated as a warning
          // at the UI level, but raised here so the caller can decide severity.
          add(`attributes.tags[${i}]`, `"${tag}" is not a known world tag key`);
        }
      });
    }
  }
}

function validateNonSectorEntity(id, entity, typeKey, errors) {
  const add = (f, m) => errors.push(mkError(id, entity.name, f, m));
  if (!isNonEmptyStr(entity.name)) add('name', 'must be a non-empty string');
  if (!isNonEmptyStr(entity.parent)) add('parent', 'must be a non-empty string');
  if (!isNonEmptyStr(entity.parentEntity)) {
    add('parentEntity', 'must be a non-empty string');
  } else if (!IMPORTABLE_ENTITY_TYPES.has(entity.parentEntity)) {
    add('parentEntity', `"${entity.parentEntity}" is not a known entity type`);
  }

  // Coordinate presence required for grid-placed entities.
  if (typeKey === 'system' || typeKey === 'blackHole') {
    if (typeof entity.x !== 'number') add('x', 'must be a number');
    if (typeof entity.y !== 'number') add('y', 'must be a number');
  }

  if (entity.attributes !== undefined) {
    validateEntityAttributes(id, entity.name, typeKey, entity.attributes, errors);
  }
}

function validateRoute(id, route, errors) {
  const add = (f, m) => errors.push(mkError(id, `route ${id}`, f, m));
  if (!Array.isArray(route.route) || route.route.length === 0) {
    add('route', 'must be a non-empty array of coordinate points');
    return;
  }
  route.route.forEach((pt, i) => {
    if (!isObj(pt) || typeof pt.x !== 'number' || typeof pt.y !== 'number') {
      add(`route[${i}]`, 'each point must be an object with numeric x and y');
    }
  });
}

function validateLayer(id, layer, errors) {
  const displayName = layer.name || `layer ${id}`;
  const add = (f, m) => errors.push(mkError(id, displayName, f, m));
  if (layer.regions != null && !isObj(layer.regions)) {
    add('regions', 'must be an object');
    return;
  }
  for (const [regionId, region] of Object.entries(layer.regions || {})) {
    if (!Array.isArray(region.hexes)) {
      add(`regions.${regionId}.hexes`, 'must be an array');
    } else {
      region.hexes.forEach((hex, i) => {
        if (!isObj(hex) || typeof hex.x !== 'number' || typeof hex.y !== 'number') {
          add(`regions.${regionId}.hexes[${i}]`, 'must be an object with numeric x and y');
        }
      });
    }
  }
}

function validateFactionSchema(id, faction, errors) {
  const add = (f, m) => errors.push(mkError(id, faction.name, f, m));
  if (!isNonEmptyStr(faction.name)) add('name', 'must be a non-empty string');
  if (faction.goal != null && !VALID_FACTION_GOAL_KEYS.has(faction.goal)) {
    add('goal', `"${faction.goal}" is not a known faction goal`);
  }
  if (Array.isArray(faction.tags)) {
    faction.tags.forEach((tag, i) => {
      if (!VALID_FACTION_TAG_KEYS.has(tag)) {
        add(`tags[${i}]`, `"${tag}" is not a known faction tag`);
      }
    });
  }
  if (faction.assets != null) {
    if (!isObj(faction.assets)) {
      add('assets', 'must be an object');
      return;
    }
    for (const [assetKey, asset] of Object.entries(faction.assets)) {
      if (!isObj(asset)) continue;
      if (!VALID_FACTION_ASSET_KEYS.has(assetKey)) {
        add(`assets.${assetKey}`, `"${assetKey}" is not a known faction asset key`);
      }
      if (asset.type != null && !VALID_FACTION_ASSET_TYPE_VALUES.has(asset.type)) {
        add(`assets.${assetKey}.type`, `"${asset.type}" is not a valid asset type`);
      }
    }
  }
}

function validateSchemas(json, errors) {
  const startCount = errors.length;

  for (const typeKey of IMPORTABLE_ENTITY_TYPES) {
    const bucket = json[typeKey];
    if (bucket == null) continue;
    if (!isObj(bucket)) {
      errors.push(mkError(null, null, typeKey, `"${typeKey}" must be an object`));
      continue;
    }
    for (const [id, entity] of Object.entries(bucket)) {
      if (!isObj(entity)) {
        errors.push(
          mkError(id, null, 'entity', `"${typeKey}.${id}" must be an object`),
        );
        continue;
      }
      if (typeKey === 'sector') {
        validateSectorEntity(id, entity, errors);
      } else {
        validateNonSectorEntity(id, entity, typeKey, errors);
      }
    }
  }

  for (const [id, route] of Object.entries(json.routes || {})) {
    if (!isObj(route)) {
      errors.push(mkError(id, null, 'route', 'must be an object'));
      continue;
    }
    validateRoute(id, route, errors);
  }

  for (const [id, layer] of Object.entries(json.layers || {})) {
    if (!isObj(layer)) {
      errors.push(mkError(id, null, 'layer', 'must be an object'));
      continue;
    }
    validateLayer(id, layer, errors);
  }

  for (const [id, faction] of Object.entries(json.factions || {})) {
    if (!isObj(faction)) {
      errors.push(mkError(id, null, 'faction', 'must be an object'));
      continue;
    }
    validateFactionSchema(id, faction, errors);
  }

  return errors.length === startCount;
}

// ─── Phase 3: ID-reference graph validation ──────────────────────────────────
// Checks every cross-document reference without touching Firestore.

function buildIdMaps(json) {
  const idToType = new Map(); // importId → entityTypeKey
  const idToDoc = new Map(); //  importId → entity object
  const duplicates = [];

  for (const typeKey of IMPORTABLE_ENTITY_TYPES) {
    if (!isObj(json[typeKey])) continue;
    for (const [id, entity] of Object.entries(json[typeKey])) {
      if (idToType.has(id)) {
        duplicates.push(id);
      } else {
        idToType.set(id, typeKey);
        idToDoc.set(id, entity);
      }
    }
  }

  return { idToType, idToDoc, duplicates };
}

// Iteratively walks the parent chain from startId to the sector root.
// Returns 'ok' | 'cycle' | 'orphan'.
// 'orphan' covers both dead-end chains (null/missing parent) and chains that
// terminate at a non-sector entity.
function resolveAncestorChain(startId, idToType, idToDoc) {
  const visited = new Set();
  let currentId = startId;

  while (true) {
    if (visited.has(currentId)) return 'cycle';
    if (!idToType.has(currentId)) return 'orphan';
    if (idToType.get(currentId) === 'sector') return 'ok';

    visited.add(currentId);

    const doc = idToDoc.get(currentId);
    if (!doc || !doc.parent) return 'orphan';
    currentId = doc.parent;
  }
}

function validateIdReferences(json, errors) {
  const { idToType, idToDoc, duplicates } = buildIdMaps(json);

  // Duplicate IDs across all entity buckets.
  for (const id of duplicates) {
    errors.push(mkError(id, null, 'id', `duplicate entity ID "${id}"`));
  }

  // Exactly one sector per import.
  const sectorIds = Object.keys(json.sector || {});
  if (sectorIds.length > 1) {
    errors.push(
      mkError(null, null, 'sector', `import must contain exactly one sector, found ${sectorIds.length}`),
    );
  }
  const sectorId = sectorIds[0];

  for (const typeKey of IMPORTABLE_ENTITY_TYPES) {
    if (typeKey === 'sector') continue;
    if (!isObj(json[typeKey])) continue;

    for (const [id, entity] of Object.entries(json[typeKey])) {
      if (!entity.parent) continue; // missing parent already reported by Phase 2

      // 3a — parent ID must exist within the import.
      if (!idToType.has(entity.parent)) {
        errors.push(
          mkError(id, entity.name, 'parent', `parent "${entity.parent}" not found in import`),
        );
        continue;
      }

      const actualParentType = idToType.get(entity.parent);

      // 3b — parentEntity must agree with the parent's actual type.
      if (entity.parentEntity && entity.parentEntity !== actualParentType) {
        errors.push(
          mkError(
            id,
            entity.name,
            'parentEntity',
            `declared "${entity.parentEntity}" but parent "${entity.parent}" is type "${actualParentType}"`,
          ),
        );
      }

      // 3c — parent type must be allowed to contain this child type.
      if (!ALLOWED_CHILDREN[actualParentType] || !ALLOWED_CHILDREN[actualParentType].has(typeKey)) {
        errors.push(
          mkError(
            id,
            entity.name,
            'parent',
            `a "${typeKey}" cannot be a child of a "${actualParentType}"`,
          ),
        );
      }

      // 3d — sector field must be consistent across all entities.
      if (sectorId && entity.sector && entity.sector !== sectorId) {
        errors.push(
          mkError(
            id,
            entity.name,
            'sector',
            `entity sector "${entity.sector}" does not match import sector "${sectorId}"`,
          ),
        );
      }
    }
  }

  // 3e — faction ID references.
  for (const [factionId, faction] of Object.entries(json.factions || {})) {
    if (!isObj(faction)) continue;
    const add = (f, m) => errors.push(mkError(factionId, faction.name, f, m));

    if (faction.homeworld) {
      if (!idToType.has(faction.homeworld)) {
        add('homeworld', `entity "${faction.homeworld}" not found in import`);
      } else if (
        faction.homeworldEntity &&
        faction.homeworldEntity !== idToType.get(faction.homeworld)
      ) {
        add(
          'homeworldEntity',
          `declared "${faction.homeworldEntity}" but "${faction.homeworld}" is type "${idToType.get(faction.homeworld)}"`,
        );
      }
    }

    for (const [assetKey, asset] of Object.entries(faction.assets || {})) {
      if (!isObj(asset) || !asset.location) continue;
      if (!idToType.has(asset.location)) {
        add(
          `assets.${assetKey}.location`,
          `entity "${asset.location}" not found in import`,
        );
      } else if (
        asset.locationEntity &&
        asset.locationEntity !== idToType.get(asset.location)
      ) {
        add(
          `assets.${assetKey}.locationEntity`,
          `declared "${asset.locationEntity}" but "${asset.location}" is type "${idToType.get(asset.location)}"`,
        );
      }
    }
  }

  // 3f — orphan detection: every non-sector entity must chain up to the sector root.
  // Skip entities whose parent is already reported missing (3a did that); only check
  // entities whose parent exists but whose deeper chain is broken.
  for (const typeKey of IMPORTABLE_ENTITY_TYPES) {
    if (typeKey === 'sector') continue;
    if (!isObj(json[typeKey])) continue;

    for (const [id, entity] of Object.entries(json[typeKey])) {
      if (!entity.parent || !idToType.has(entity.parent)) continue;

      const result = resolveAncestorChain(id, idToType, idToDoc);
      if (result === 'cycle') {
        errors.push(mkError(id, entity.name, 'parent', 'circular parent chain detected'));
      } else if (result === 'orphan') {
        errors.push(
          mkError(id, entity.name, 'parent', 'no path from this entity to a sector root'),
        );
      }
    }
  }
}

// ─── Phase 4: Coordinate & bounds validation ─────────────────────────────────
// Requires a valid sector (rows/columns) from Phase 2.

function validateCoordinates(json, errors) {
  const sectorEntry = isObj(json.sector) ? Object.values(json.sector)[0] : null;
  if (!sectorEntry || !isInt(sectorEntry.rows) || !isInt(sectorEntry.columns)) return;

  const { rows, columns } = sectorEntry;

  const inBounds = (id, name, x, y) => {
    if (!isInt(x) || x < 0 || x >= columns) {
      errors.push(mkError(id, name, 'x', `x=${x} out of sector bounds [0, ${columns - 1}]`));
    }
    if (!isInt(y) || y < 0 || y >= rows) {
      errors.push(mkError(id, name, 'y', `y=${y} out of sector bounds [0, ${rows - 1}]`));
    }
  };

  // Grid-placed entities: coordinates must be integers within sector dimensions
  // and no two entities may share the same hex.
  const occupied = new Map(); // `${x},${y}` → entityId
  for (const typeKey of ['system', 'blackHole']) {
    for (const [id, entity] of Object.entries(json[typeKey] || {})) {
      inBounds(id, entity.name, entity.x, entity.y);
      if (isInt(entity.x) && isInt(entity.y)) {
        const coordKey = `${entity.x},${entity.y}`;
        if (occupied.has(coordKey)) {
          errors.push(
            mkError(
              id,
              entity.name,
              'x/y',
              `coordinates (${entity.x}, ${entity.y}) already occupied by entity "${occupied.get(coordKey)}"`,
            ),
          );
        } else {
          occupied.set(coordKey, id);
        }
      }
    }
  }

  // Route waypoints.
  for (const [routeId, route] of Object.entries(json.routes || {})) {
    if (!Array.isArray(route.route)) continue;
    route.route.forEach((pt, i) => {
      if (isObj(pt) && typeof pt.x === 'number' && typeof pt.y === 'number') {
        inBounds(routeId, `route ${routeId}[${i}]`, pt.x, pt.y);
      }
    });
  }

  // Layer region hexes.
  for (const [layerId, layer] of Object.entries(json.layers || {})) {
    for (const [regionId, region] of Object.entries(layer.regions || {})) {
      if (!Array.isArray(region.hexes)) continue;
      region.hexes.forEach((hex, i) => {
        if (isObj(hex) && typeof hex.x === 'number' && typeof hex.y === 'number') {
          inBounds(layerId, `layer ${layerId} / region ${regionId}[${i}]`, hex.x, hex.y);
        }
      });
    }
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Validates a parsed JSON import payload against the sectors-without-number
 * entity model. Pure function — no Firestore reads, no side effects.
 *
 * @param {unknown} json  Parsed JSON payload (not a string).
 * @returns {{ valid: boolean, errors: Array<{entityId, entityName, field, message}> }}
 */
export function validateImport(json) {
  const errors = [];

  // Phase 1: top-level structure — early exit if fundamentally malformed.
  if (!validateTopLevel(json, errors)) {
    return { valid: false, errors };
  }

  // Phase 2: per-document schema — early exit so Phase 3 gets a clean ID map.
  const schemasOk = validateSchemas(json, errors);
  if (!schemasOk) {
    return { valid: false, errors };
  }

  // Phase 3: cross-document ID references and hierarchy graph.
  validateIdReferences(json, errors);

  // Phase 4: coordinate values and uniqueness (needs valid sector dimensions).
  validateCoordinates(json, errors);

  return { valid: errors.length === 0, errors };
}
