import Entities from 'constants/entities';

import { has, pick, pickBy, mapValues } from 'constants/lodash';
import { createId } from 'utils/common';

const createMultipleImporter = (entitiyType, importFunction) => params => {
  const { data, oldParent, parentEntity } = params;
  if (!oldParent || !parentEntity) {
    throw new Error(`Parent must be defined to import multiple ${entitiyType}`);
  }
  if (!has(data, entitiyType)) {
    throw new Error(
      `The import data has not right structure to import multiple ${entitiyType}`,
    );
  }

  const keyMpping = Object.keys(
    pickBy(
      data[entitiyType],
      entity =>
        entity.parent === oldParent && entity.parentEntity === parentEntity,
    ),
  ).map(key => ({ oldKey: key, newKey: createId() }));
  const children = keyMpping.reduce(
    (obj, { oldKey, newKey }) => ({
      ...obj,
      [newKey]: importFunction({ ...params, key: oldKey }),
    }),
    {},
  );
  return { children, keyMpping };
};

const createImporter = (entitiyType, propertiesToPick) => ({
  data,
  key,
  sector,
  newParent,
  parentEntity,
}) => {
  if (entitiyType !== Entities.sector.key && !sector) {
    throw new Error(`Sector id must be defined to import a ${entitiyType}`);
  }
  if (!has(data, [entitiyType, key])) {
    throw new Error(
      `The import data has not right structure to import ${entitiyType}`,
    );
  }

  return {
    ...pick(data[entitiyType][key], propertiesToPick),
    sector,
    parent: newParent,
    parentEntity,
  };
};

const defProps = ['name', 'isHidden'];
const defPropsWithAttr = defProps.concat(['image', 'visibility', 'attributes']);
const defPropsWithPos = defPropsWithAttr.concat(['x', 'y']);

const importFields = {
  [Entities.asteroidBase.key]: defPropsWithAttr,
  [Entities.asteroidBelt.key]: defPropsWithAttr,
  [Entities.blackHole.key]: defPropsWithPos,
  [Entities.deepSpaceStation.key]: defPropsWithAttr,
  [Entities.gasGiantMine.key]: defPropsWithAttr,
  [Entities.moon.key]: defPropsWithAttr,
  [Entities.moonBase.key]: defPropsWithAttr,
  [Entities.note.key]: defProps,
  [Entities.orbitalRuin.key]: defPropsWithAttr,
  [Entities.planet.key]: defPropsWithAttr,
  [Entities.refuelingStation.key]: defPropsWithAttr,
  [Entities.researchBase.key]: defPropsWithAttr,
  [Entities.sector.key]: ['name', 'rows', 'columns'],
  [Entities.spaceStation.key]: defPropsWithAttr,
  [Entities.system.key]: defPropsWithPos,
};

export default mapValues(importFields, (value, key) => {
  const importer = createImporter(key, value);

  return {
    importOne: importer,
    importAll: createMultipleImporter(key, importer),
  };
});
