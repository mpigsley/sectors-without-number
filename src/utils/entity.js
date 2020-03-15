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
  reduce,
} from 'constants/lodash';
import {
  syncLockSelector,
  savedSectorSelector,
  isLoggedInSelector,
  userUidSelector,
  currentSectorSelector,
} from 'store/selectors/base.selectors';
import {
  getCurrentEntities,
  getCurrentEntityId,
  getCurrentEntityType,
} from 'store/selectors/entity.selectors';
import { isCurrentSectorSaved } from 'store/selectors/sector.selectors';

import {
  uploadEntities,
  deleteSector,
  deleteEntities as syncDeleteEntities,
  updateEntities as syncUpdateEntities,
} from 'store/api/entity';
import {
  SuccessToast,
  ErrorToast,
  InfoToast,
  WarningToast,
} from 'utils/toasts';
import EntityGenerators from 'utils/entity-generators';
import { createId, coordinateKey, allSectorCoordinates } from 'utils/common';

import Entities from 'constants/entities';
import { SECTOR_LIMIT } from 'constants/defaults';

export const syncLock = (action, parameters = {}) => (dispatch, getState) => {
  if (syncLockSelector(getState())) {
    return Promise.resolve();
  }
  return dispatch({ type: action, ...parameters });
};

export const preventSync = (intl, isGenerating) => (dispatch, getState) => {
  const state = getState();
  const isSyncing = !isCurrentSectorSaved(state);
  const isLoggedIn = isLoggedInSelector(state);
  const reachedSectorLimit = savedSectorSelector(state).length >= SECTOR_LIMIT;
  if (!isLoggedIn && !isGenerating) {
    dispatch(
      WarningToast({
        title: intl.formatMessage({ id: 'misc.signUpPersist' }),
        message: intl.formatMessage({ id: 'misc.syncedAutomatically' }),
      }),
    );
  } else if (reachedSectorLimit && isSyncing) {
    dispatch(
      InfoToast({
        title: intl.formatMessage({ id: 'misc.reachedLimit' }),
        message: intl.formatMessage(
          { id: 'misc.haveNumSectors' },
          { num: SECTOR_LIMIT },
        ),
      }),
    );
  }
  return (
    (!isLoggedIn && !isGenerating) ||
    (isSyncing && (syncLockSelector(state) || reachedSectorLimit))
  );
};

export const SYNC_TOAST_ID = 'initial-sync';
export const initialSyncToast = (state, dispatch, intl) => {
  if (!isCurrentSectorSaved(state)) {
    return new Promise(resolve => {
      dispatch(
        InfoToast({
          title: intl.formatMessage({ id: 'misc.syncingSector' }),
          message: intl.formatMessage({ id: 'misc.noExit' }),
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
  customTags = {},
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
          customTags,
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
        name: name || configuration.sectorName,
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
  'isUpdated',
  'isCreated',
  'type',
  'key',
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

export const deleteEntities = ({ state, deleted }, intl) => {
  const isLoggedIn = isLoggedInSelector(state);
  const isSaved = isCurrentSectorSaved(state);
  const currentEntityType = getCurrentEntityType(state);
  if (!isSaved || !isLoggedIn) {
    return Promise.resolve();
  }
  const entityName = intl.formatMessage({
    id: Entities[currentEntityType].name,
  });
  let promise;
  if (currentEntityType === Entities.sector.key) {
    promise = deleteSector(getCurrentEntityId(state));
  } else {
    promise = syncDeleteEntities(deleted);
  }
  return promise
    .then(() => ({
      action: SuccessToast({
        title: intl.formatMessage(
          { id: 'misc.entityDeleted' },
          { entity: entityName },
        ),
        message: intl.formatMessage(
          { id: 'misc.successfullyRemoved' },
          { entity: entityName },
        ),
      }),
    }))
    .catch(err => {
      console.error(err);
      return {
        action: ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      };
    });
};

export const saveEntities = (
  { state, updated, created, deleted, entities },
  intl,
) => {
  const uid = userUidSelector(state);
  const isSaved = isCurrentSectorSaved(state);
  let promise;
  if (isSaved) {
    if (uid) {
      const promises = [];
      if (created) {
        promises.push(uploadEntities(created, currentSectorSelector(state)));
      }
      if (deleted) {
        promises.push(syncDeleteEntities(deleted));
      }
      if (updated) {
        promises.push(syncUpdateEntities(updated));
      }
      promise = Promise.all(promises).then(([uploaded]) => ({
        mapping: (uploaded || {}).mapping || {},
      }));
    } else {
      return Promise.resolve();
    }
  } else {
    const updates = pickBy(
      mergeEntityUpdates(getCurrentEntities(state), entities),
      size,
    );
    if (uid) {
      promise = uploadEntities(updates);
    } else {
      return Promise.resolve();
    }
  }
  return promise
    .then(uploaded => ({
      action: SuccessToast({
        title: intl.formatMessage({ id: 'misc.sectorSaved' }),
        message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
      }),
      mapping: (uploaded || {}).mapping || {},
    }))
    .catch(err => {
      console.error(err);
      let action = ErrorToast({
        title: intl.formatMessage({ id: 'misc.error' }),
        message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
      });
      if (err.code === 'permission-denied' && err.details) {
        action = InfoToast({
          title: intl.formatMessage({ id: 'misc.reachedLimit' }),
          message: intl.formatMessage(
            { id: 'misc.haveNumSectors' },
            { num: err.details.limit },
          ),
        });
      }
      return {
        action,
        mapping: {},
      };
    });
};

export const translateEntities = (entities, intl) =>
  mapValues(entities, (entityTypes, entityType) =>
    mapValues(entityTypes, entity => {
      let translatedAttributes = mapValues(
        omit(entity.attributes, 'tags'),
        (value, key) => {
          const attribute = find(Entities[entityType].attributes, {
            key,
          });
          if (!attribute || !attribute.attributes[value]) {
            return null;
          }
          return intl.formatMessage({
            id: attribute.attributes[value].name,
          });
        },
      );

      if (((entity.attributes || {}).tags || []).length) {
        translatedAttributes = {
          ...translatedAttributes,
          tags: entity.attributes.tags
            .map(tag => {
              const { key, name, ...lists } =
                (Entities[entityType].tags || {})[tag] || {};
              if (!key) {
                return null;
              }
              const baseId = `tags.${key}`;
              return {
                name: intl.formatMessage({ id: baseId }),
                description: intl.formatMessage({
                  id: `${baseId}.description`,
                }),
                ...reduce(
                  lists,
                  (obj, listLength, listKey) => ({
                    ...obj,
                    [listKey]: [...Array(listLength).keys()].map(index =>
                      intl.formatMessage({
                        id: `${baseId}.${listKey}.${index}`,
                      }),
                    ),
                  }),
                  {},
                ),
              };
            })
            .filter(tag => tag),
        };
      }

      return {
        ...entity,
        attributes: translatedAttributes,
      };
    }),
  );

export const getTopLevelEntity = (topLevelEntities, key) => {
  const entityId = findKey(
    topLevelEntities,
    ({ x, y }) => coordinateKey(x, y) === key,
  );
  const entity = topLevelEntities[entityId];
  return { entity, entityId, entityType: (entity || {}).type };
};

export const findTopLevelEntity = (entities, entity) => {
  let traversable = entity;
  let bailout = 20;

  while (traversable.parentEntity !== Entities.sector.key && bailout > 0) {
    traversable = entities[traversable.parentEntity][traversable.parent];
    bailout -= 1;
  }

  return bailout ? traversable : undefined;
};
