import { zipObject, pickBy, size, omit } from 'lodash';

import EntityGenerators from 'utils/entity-generators';
import { createId } from 'utils/common';
import Entities from 'constants/entities';

export const generateEntity = ({
  entityType,
  currentSector,
  configuration,
  parameters,
}) => {
  const entityId = createId();
  const sector = entityType === Entities.sector.key ? entityId : currentSector;
  const config = configuration;

  let childrenEntities = {};
  const generateChildren = (parent, parentEntity) =>
    Entities[parentEntity].children.forEach(childEntity => {
      const children = EntityGenerators[childEntity].generateAll(config, {
        sector,
        parent,
        parentEntity,
      });
      const childrenObj = zipObject(children.map(() => createId()), children);
      childrenEntities = {
        ...childrenEntities,
        [childEntity]: {
          ...(childrenEntities[childEntity] || {}),
          ...childrenObj,
        },
      };
      Object.keys(childrenObj).map(newKey =>
        generateChildren(newKey, childEntity),
      );
    });

  generateChildren(entityId, entityType);

  return {
    [entityType]: {
      [entityId]: EntityGenerators[entityType].generateOne(config, parameters),
    },
    ...pickBy(childrenEntities, size),
  };
};

export const deleteEntity = ({ entityType, entity, entities }) => {
  let childrenEntities = {};
  const deleteChildren = (parent, parentType) =>
    Entities[parentType].children.forEach(childType => {
      const childrenToDelete = Object.keys(
        pickBy(entities[childType], child => child.parent === parent),
      );

      childrenEntities = {
        ...childrenEntities,
        [childType]: omit(
          childrenEntities[childType] || entities[childType],
          childrenToDelete,
        ),
      };

      childrenToDelete.forEach(childId => deleteChildren(childId, childType));
    });

  deleteChildren(entity, entityType);

  return {
    [entityType]: omit(entities[entityType], entity),
    ...childrenEntities,
  };
};
