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
  find,
} from 'lodash';

import {
  syncLockSelector,
  savedSectorSelector,
} from 'store/selectors/base.selectors';
import { isCurrentSectorSaved } from 'store/selectors/sector.selectors';

import EntityGenerators from 'utils/entity-generators';
import { createId, coordinateKey, allSectorCoordinates } from 'utils/common';
import { InfoToast } from 'utils/toasts';

import Entities from 'constants/entities';
import { SECTOR_LIMIT } from 'constants/defaults';

export const syncLock = (action, parameters = {}) => (dispatch, getState) => {
  if (syncLockSelector(getState())) {
    return Promise.resolve();
  }
  return dispatch({ type: action, ...parameters });
};

export const preventSync = (state, dispatch) => {
  const isSyncing = !isCurrentSectorSaved(state);
  const reachedSectorLimit = savedSectorSelector(state).length >= SECTOR_LIMIT;
  if (reachedSectorLimit && isSyncing) {
    dispatch(
      InfoToast({
        title: 'Reached Sector Limit',
        message: `You already have at least ${SECTOR_LIMIT} sectors.`,
      }),
    );
  }
  return isSyncing && (syncLockSelector(state) || reachedSectorLimit);
};

export const SYNC_TOAST_ID = 'initial-sync';
export const initialSyncToast = (state, dispatch) => {
  if (!isCurrentSectorSaved(state)) {
    return new Promise(resolve => {
      dispatch(
        InfoToast({
          title: 'Syncing Sector',
          message: 'Do not exit out of this web page.',
          config: {
            id: SYNC_TOAST_ID,
            options: {
              timeOut: 0,
              removeOnHover: false,
              showCloseButton: false,
              progressBar: false,
            },
          },
        }),
      );
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
  return Promise.resolve();
};

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

  let childrenEntities = {};
  const generateChildren = (parent, parentEntity, isFirstLevel = false) =>
    Entities[parentEntity].children
      .filter(
        childEntity =>
          !isFirstLevel ||
          !parameters.children ||
          (parameters.children || {})[childEntity],
      )
      .forEach(childEntity => {
        const entityChildren = (parameters.children || {})[childEntity];
        const { children, coordinates } = EntityGenerators[
          childEntity
        ].generateAll({
          sector,
          parent,
          parentEntity,
          children: isFirstLevel ? entityChildren : undefined,
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
        Object.keys(
          pickBy(childrenObj, childObj => {
            const childGenerate = (
              find(
                entityChildren || [],
                child => child.name === childObj.name,
              ) || {}
            ).generate;
            return !isFirstLevel || childGenerate !== false;
          }),
        ).map(newKey => generateChildren(newKey, childEntity));
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
