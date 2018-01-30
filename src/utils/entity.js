import {
  zipObject,
  pickBy,
  size,
  merge,
  mapValues,
  omitBy,
  isNil,
  omit,
  isObject,
  findKey,
} from 'lodash';

import EntityGenerators from 'utils/entity-generators';
import { createId, coordinateKey, allSectorCoordinates } from 'utils/common';
import Entities from 'constants/entities';

export const generateEntity = ({
  entity,
  currentSector,
  configuration,
  parameters = {},
}) => {
  const { entityType, name } = entity;
  const entityId = createId();
  const sector = entityType === Entities.sector.key ? entityId : currentSector;
  const config =
    entityType === Entities.sector.key
      ? configuration
      : { ...configuration, additionalPointsOfInterest: true };
  let filteredCoordinates = allSectorCoordinates(
    configuration.columns,
    configuration.rows,
  );

  console.log(entity, parameters);

  let childrenEntities = {};
  const generateChildren = (parent, parentEntity, isFirstLevel = false) =>
    Entities[parentEntity].children
      .filter(
        childEntity =>
          !isFirstLevel || (parameters.children || {})[childEntity],
      )
      .forEach(childEntity => {
        const { children, coordinates } = EntityGenerators[
          childEntity
        ].generateAll({
          sector,
          parent,
          parentEntity,
          children: isFirstLevel
            ? (parameters.children || {})[childEntity]
            : undefined,
          coordinates: filteredCoordinates,
          ...config,
        });
        filteredCoordinates = coordinates || filteredCoordinates;
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

  if (
    entityType === Entities.sector.key
      ? !configuration.isBuilder
      : parameters.generate
  ) {
    generateChildren(entityId, entityType, true);
  }

  return {
    [entityType]: {
      [entityId]: EntityGenerators[entityType].generateOne({
        sector,
        ...configuration,
        name: name || configuration.name,
        ...parameters,
      }),
    },
    ...pickBy(childrenEntities, size),
  };
};

export const deleteEntity = ({ entityType, entityId, entities }) => {
  let childrenEntities = {};
  const deleteChildren = (parent, parentType) =>
    Entities[parentType].children.forEach(childType => {
      const childrenToDelete = Object.keys(
        pickBy(entities[childType], child => child.parent === parent),
      );

      childrenEntities = {
        ...childrenEntities,
        [childType]: [
          ...(childrenEntities[childType] || []),
          ...childrenToDelete,
        ],
      };

      childrenToDelete.forEach(childId => deleteChildren(childId, childType));
    });

  deleteChildren(entityId, entityType);

  return merge(pickBy(childrenEntities, size), {
    [entityType]: [entityId],
  });
};

export const blacklistedAttributes = [
  'sort',
  'numChildren',
  'generate',
  'isUpdated',
  'isCreated',
  'type',
];
export const mergeEntityUpdates = (state, updates) => ({
  ...state,
  ...mapValues(updates, (entities, entityType) =>
    omitBy(
      {
        ...state[entityType],
        ...mapValues(entities, (thisEntity, entityId) => {
          if (!thisEntity) {
            return null;
          }
          const existingEntity = (state[entityType] || {})[entityId] || {};
          const mergedEntity = {
            ...existingEntity,
            ...omit(thisEntity, blacklistedAttributes),
          };
          const tags =
            mergedEntity.attributes && mergedEntity.attributes.tags
              ? mergedEntity.attributes.tags.filter(tag => tag)
              : null;
          const attributes = omitBy(
            { ...mergedEntity.attributes, tags },
            isNil,
          );
          return omitBy(
            { ...mergedEntity, attributes },
            obj => isNil(obj) || (isObject(obj) && !size(obj)),
          );
        }),
      },
      isNil,
    ),
  ),
});

export const getTopLevelEntity = (topLevelEntities, key) => {
  const entityId = findKey(
    topLevelEntities,
    ({ x, y }) => coordinateKey(x, y) === key,
  );
  const entity = topLevelEntities[entityId];
  return { entity, entityId, entityType: (entity || {}).type };
};
