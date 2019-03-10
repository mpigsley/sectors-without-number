import Entities from 'constants/entities';
import { Validator } from 'jsonschema';

const idPattern = '^[0-9a-zA-Z]{20}$';

function generateParentsProps(entityType) {
  const parents = Object.keys(Entities).filter(key =>
    Entities[key].children.includes(entityType),
  );

  if (parents.length === 0) return {};

  return {
    parent: { type: 'string', pattern: idPattern },
    parentEntity: {
      type: 'string',
      enum: parents,
    },
  };
}

function generateAttributesProps(entityType) {
  const attrPros = { description: { type: 'string' } };
  const visProps = { 'attr.image': { type: 'boolean' } };
  Entities[entityType].attributes.forEach(attr => {
    attrPros[attr.key] = {
      type: 'string',
      enum: Object.values(attr.attributes).map(a => a.key),
    };
    visProps[`attr.${attr.key}`] = {
      type: 'boolean',
    };
  });

  return {
    image: { type: 'string' },
    attributes: {
      type: 'object',
      properties: {
        ...attrPros,
      },
    },
    visibility: {
      type: 'object',
      properties: {
        ...visProps,
      },
    },
  };
}

function generateEntitiesSchema(entityType, requiredProps = ['name']) {
  let properties = {
    name: { type: 'string' },
    ...generateParentsProps(entityType),
  };

  if (entityType === Entities.sector.key) {
    properties = {
      ...properties,
      rows: { type: 'number', multipleOf: 1.0, minimum: 1, maximum: 20 },
      columns: { type: 'number', multipleOf: 1.0, minimum: 1, maximum: 20 },
    };
  } else {
    properties = {
      ...properties,
      isHidden: { type: 'boolean' },
    };
  }

  if (entityType !== Entities.note.key) {
    properties = {
      ...properties,
      ...generateAttributesProps(entityType),
    };
  }

  if (Entities[entityType].topLevel) {
    properties = {
      ...properties,
      x: { type: 'number', multipleOf: 1.0, minimum: 1 },
      y: { type: 'number', multipleOf: 1.0, minimum: 1 },
    };
  }

  return {
    patternProperties: {
      [idPattern]: {
        type: 'object',
        properties,
        requiredProps,
      },
    },
    additionalProperties: false,
  };
}

const schema = {
  type: 'object',
  properties: {
    ...[
      Entities.asteroidBase.key,
      Entities.asteroidBelt.key,
      Entities.blackHole.key,
      Entities.deepSpaceStation.key,
      Entities.gasGiantMine.key,
      Entities.moon.key,
      Entities.moonBase.key,
      Entities.note.key,
      Entities.orbitalRuin.key,
      Entities.planet.key,
      Entities.refuelingStation.key,
      Entities.researchBase.key,
      Entities.sector.key,
      Entities.spaceStation.key,
      Entities.system.key,
    ].reduce(
      (o, entityType) => ({
        ...o,
        [entityType]: generateEntitiesSchema(entityType),
      }),
      {},
    ),
  },
  additionalProperties: true,
};

export default function validate(jsonData) {
  const v = new Validator();
  return v.validate(jsonData, schema).valid;
}
