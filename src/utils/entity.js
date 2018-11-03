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
  getCurrentEntityType,
} from 'store/selectors/entity.selectors';
import { isCurrentSectorSaved } from 'store/selectors/sector.selectors';

import {
  uploadEntities,
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

export const getTopLevelEntity = (topLevelEntities, key) => {
  const entityId = findKey(
    topLevelEntities,
    ({ x, y }) => coordinateKey(x, y) === key,
  );
  const entity = topLevelEntities[entityId];
  return { entity, entityId, entityType: (entity || {}).type };
};

export const deleteEntities = ({ state, deleted }, intl) => {
  const isLoggedIn = isLoggedInSelector(state);
  const isSaved = isCurrentSectorSaved(state);
  const currentEntityType = getCurrentEntityType(state);
  if (!isSaved) {
    return Promise.resolve();
  }
  if (!isLoggedIn) {
    return Promise.resolve();
  }
  const entityName = intl.formatMessage({
    id: Entities[currentEntityType].name,
  });
  return syncDeleteEntities(deleted)
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

export const saveEntities = ({ updated, created, deleted, entities }, intl) => (
  dispatch,
  getState,
) => {
  const state = getState();
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
