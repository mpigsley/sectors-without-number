import Entities from 'constants/entities';
import { Validator } from 'jsonschema';

const idPattern = '^[0-9a-zA-Z]{20}$';

const defEntityProps = {
  name: { type: 'string' },
  isHidden: { type: 'boolean' },
  parent: { type: 'string', pattern: idPattern },
  parentEntity: {
    type: 'string',
    enum: [
      'asteroidBase',
      'asteroidBelt',
      'blackHole',
      'deepSpaceStation',
      'gasGiantMine',
      'layer',
      'moon',
      'moonBase',
      'navigation',
      'note',
      'orbitalRuin',
      'planet',
      'refuelingStation',
      'researchBase',
      'sector',
      'spaceStation',
      'system',
      'settings',
    ],
  },
};

const entityWithAttrProps = {
  image: { type: 'string' },
  attributes: {
    type: 'object',
    properties: {
      occupation: { type: 'string' },
      situation: { type: 'string' },
      description: { type: 'string' },
    },
  },
  visibility: {
    type: 'object',
    properties: {
      'attr.occupation': { type: 'boolean' },
      'attr.situation': { type: 'boolean' },
    },
  },
};

const entitiyWithPosProps = {
  x: { type: 'number', multipleOf: 1.0, minimum: 1 },
  y: { type: 'number', multipleOf: 1.0, minimum: 1 },
};

function generateEntitiesSchema(properties, required = ['name']) {
  return {
    patternProperties: {
      [idPattern]: {
        type: 'object',
        properties,
        required,
      },
    },
    additionalProperties: false,
  };
}

const sectorsSchema = generateEntitiesSchema({
  name: { type: 'string' },
  rows: { type: 'number', multipleOf: 1.0, minimum: 1, maximum: 20 },
  columns: { type: 'number', multipleOf: 1.0, minimum: 1, maximum: 20 },
});

const defEntitiesSchema = generateEntitiesSchema({
  ...defEntityProps,
});

const defEntitiesSchemaWithAttr = generateEntitiesSchema({
  ...defEntityProps,
  ...entityWithAttrProps,
});

const defEntitiesSchemaWithPos = generateEntitiesSchema({
  ...defEntityProps,
  ...entityWithAttrProps,
  ...entitiyWithPosProps,
});

const schema = {
  type: 'object',
  properties: {
    [Entities.asteroidBase.key]: defEntitiesSchemaWithAttr,
    [Entities.asteroidBelt.key]: defEntitiesSchemaWithAttr,
    [Entities.blackHole.key]: defEntitiesSchemaWithPos,
    [Entities.deepSpaceStation.key]: defEntitiesSchemaWithAttr,
    [Entities.gasGiantMine.key]: defEntitiesSchemaWithAttr,
    [Entities.moon.key]: defEntitiesSchemaWithAttr,
    [Entities.moonBase.key]: defEntitiesSchemaWithAttr,
    [Entities.note.key]: defEntitiesSchema,
    [Entities.orbitalRuin.key]: defEntitiesSchemaWithAttr,
    [Entities.planet.key]: defEntitiesSchemaWithAttr,
    [Entities.refuelingStation.key]: defEntitiesSchemaWithAttr,
    [Entities.researchBase.key]: defEntitiesSchemaWithAttr,
    [Entities.sector.key]: sectorsSchema,
    [Entities.spaceStation.key]: defEntitiesSchemaWithAttr,
    [Entities.system.key]: defEntitiesSchemaWithPos,
  },
  additionalProperties: true,
};

export default function validate(jsonData) {
  const v = new Validator();
  return v.validate(jsonData, schema).valid;
}
