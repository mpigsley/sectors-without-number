import { push } from 'react-router-redux';
import {
  mapValues,
  merge,
  omitBy,
  isNil,
  forEach,
  zipObject,
  pickBy,
  size,
} from 'lodash';

import { DEACTIVATE_SIDEBAR_EDIT } from 'store/actions/sidebar-edit.actions';
import {
  configurationSelector,
  currentSectorSelector,
  currentEntitySelector,
  currentEntityTypeSelector,
  entitySelector,
  sidebarEditSelector,
  holdKeySelector,
  hoverKeySelector,
} from 'store/selectors/base.selectors';
import {
  getCurrentTopLevelEntities,
  getCurrentEntityType,
  getCurrentEntityId,
  getCurrentEntity,
} from 'store/selectors/entity.selectors';

import {
  generateEntity as generateEntityUtil,
  deleteEntity as deleteEntityUtil,
  getTopLevelEntity,
} from 'utils/entity';
import { coordinatesFromKey } from 'utils/common';
import { saveEntities, deleteEntities } from 'store/utils';
import Entities from 'constants/entities';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';
export const DELETE_ENTITIES = 'DELETE_ENTITIES';
export const SAVE_SECTOR = 'SAVE_SECTOR';
export const UPDATE_ID_MAPPING = 'UPDATE_ID_MAPPING';

const updateHandler = (state, dispatch) => ({ action, mapping }) => {
  if (!mapping) {
    return dispatch(action);
  }
  const currentEntity = currentEntitySelector(state);
  const currentEntityType = currentEntityTypeSelector(state);
  const entityUrl = currentEntity
    ? `/${currentEntityType}/${mapping[currentEntity]}`
    : '';
  return Promise.all([
    dispatch({ type: UPDATE_ID_MAPPING, mapping }),
    dispatch(action),
  ]).then(() =>
    dispatch(
      push(`/sector/${mapping[currentSectorSelector(state)]}${entityUrl}`),
    ),
  );
};

export const generateEntity = (entity, parameters) => (dispatch, getState) => {
  const state = getState();
  const entities = generateEntityUtil({
    entity,
    currentSector: currentSectorSelector(state),
    configuration: configurationSelector(state),
    parameters,
  });
  dispatch({
    type: UPDATE_ENTITIES,
    entities,
  });

  const existingSector = state.entity.sector[state.sector.currentSector];
  const newSectorKeys = Object.keys(entities.sector || {});
  if (
    (!state.sector.currentSector || !existingSector) &&
    newSectorKeys.length
  ) {
    dispatch(push(`/sector/${newSectorKeys[0]}`));
  }

  if (entity.entityType !== Entities.sector.key) {
    return saveEntities({ state, entities }).then(
      updateHandler(state, dispatch),
    );
  }
  return Promise.resolve();
};

export const moveTopLevelEntity = () => (dispatch, getState) => {
  const state = getState();
  const topLevelEntities = getCurrentTopLevelEntities(state);
  const holdEntity = getTopLevelEntity(
    topLevelEntities,
    holdKeySelector(state),
  );
  const hoverKey = hoverKeySelector(state);
  const hoverEntity = getTopLevelEntity(topLevelEntities, hoverKey);
  const holdUpdate = { ...holdEntity.entity, ...coordinatesFromKey(hoverKey) };
  let entities = {
    [holdEntity.entityType]: { [holdEntity.entityId]: holdUpdate },
  };
  if (hoverEntity.entity) {
    const hoverUpdate = {
      ...hoverEntity.entity,
      x: holdEntity.entity.x,
      y: holdEntity.entity.y,
    };
    entities = {
      ...entities,
      [hoverEntity.entityType]: {
        ...(entities[hoverEntity.entityType] || {}),
        [hoverEntity.entityId]: hoverUpdate,
      },
    };
  }
  dispatch({ type: UPDATE_ENTITIES, entities });
  return saveEntities({ state, entities }).then(updateHandler(state, dispatch));
};

export const deleteEntity = () => (dispatch, getState) => {
  const state = getState();
  const entity = getCurrentEntity(state);
  const currentSector = currentSectorSelector(state);
  if (!entity.parent) {
    dispatch(push('/'));
  } else if (entity.parent === currentSector) {
    dispatch(push(`/sector/${entity.parent}`));
  } else {
    dispatch(
      push(`/sector/${currentSector}/${entity.parentEntity}/${entity.parent}`),
    );
  }
  const deleted = deleteEntityUtil({
    entityType: getCurrentEntityType(state),
    entityId: getCurrentEntityId(state),
    entities: entitySelector(state),
  });
  dispatch({
    type: DELETE_ENTITIES,
    entities: deleted,
  });
  return deleteEntities({ state, deleted }).then(
    updateHandler(state, dispatch),
  );
};

export const saveSector = () => (dispatch, getState) => {
  const state = getState();
  dispatch({ type: SAVE_SECTOR });
  return saveEntities({ state }).then(updateHandler(state, dispatch));
};

export const saveEntityEdit = () => (dispatch, getState) => {
  const state = getState();
  const currentEntityType = getCurrentEntityType(state);
  const currentEntityId = getCurrentEntityId(state);
  const { entity, children } = sidebarEditSelector(state);

  let createdEntities = {};
  const deletedEntities = {};
  let updatedEntities = mapValues(children, (entities, thisEntityType) =>
    omitBy(
      mapValues(
        entities,
        ({ isCreated, isDeleted, isUpdated, ...thisEntity }, thisEntityId) => {
          if (isCreated) {
            createdEntities = merge(
              createdEntities,
              generateEntityUtil({
                entity: { entityType: thisEntityType },
                currentSector: currentSectorSelector(state),
                configuration: configurationSelector(state),
                parameters: {
                  ...thisEntity,
                  parentEntity: currentEntityType,
                  parent: currentEntityId,
                },
              }),
            );
          } else if (isDeleted) {
            forEach(
              deleteEntityUtil({
                entityType: thisEntityType,
                entityId: thisEntityId,
                entities: entitySelector(state),
              }),
              (entityIdArray, deletedType) => {
                deletedEntities[deletedType] = [
                  ...(deletedEntities[deletedType] || []),
                  ...entityIdArray,
                ];
              },
            );
          }
          return isDeleted || isCreated || !isUpdated ? undefined : thisEntity;
        },
      ),
      isNil,
    ),
  );

  updatedEntities = merge(updatedEntities, createdEntities);
  if (entity.isUpdated) {
    updatedEntities = merge(updatedEntities, {
      [currentEntityType]: { [currentEntityId]: entity },
    });
  }

  const onlyUpdated = { ...updatedEntities };
  updatedEntities = merge(
    updatedEntities,
    mapValues(deletedEntities, deletedIds =>
      zipObject(deletedIds, deletedIds.map(() => null)),
    ),
  );

  const filteredUpdatedEntities = pickBy(updatedEntities, size);
  if (size(filteredUpdatedEntities)) {
    dispatch({
      type: UPDATE_ENTITIES,
      entities: filteredUpdatedEntities,
    });
    return saveEntities({
      state,
      entities: filteredUpdatedEntities,
      updated: onlyUpdated,
      deleted: deletedEntities,
    }).then(updateHandler(state, dispatch));
  }
  return dispatch({ type: DEACTIVATE_SIDEBAR_EDIT });
};
