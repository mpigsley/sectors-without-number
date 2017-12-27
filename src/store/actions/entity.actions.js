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

import {
  configurationSelector,
  currentSectorSelector,
  entitySelector,
  sidebarEditSelector,
} from 'store/selectors/base.selectors';
import {
  getCurrentEntityType,
  getCurrentEntityId,
} from 'store/selectors/entity.selectors';
import {
  generateEntity as generateEntityUtil,
  deleteEntity as deleteEntityUtil,
} from 'utils/entity';
import { DEACTIVATE_SIDEBAR_EDIT } from 'store/actions/sidebar-edit.actions';
import { saveEntities } from 'store/utils';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';
export const DELETE_ENTITIES = 'DELETE_ENTITIES';

export const generateEntity = (entityType, parameters) => (
  dispatch,
  getState,
) => {
  const state = getState();
  const entities = generateEntityUtil({
    entityType,
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
};

export const deleteEntity = () => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: DELETE_ENTITIES,
    entities: deleteEntityUtil({
      entityType: getCurrentEntityType(state),
      entityId: getCurrentEntityId(state),
      entities: entitySelector(state),
    }),
  });
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
                entityType: thisEntityType,
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
    }).then(dispatch);
  }
  return dispatch({ type: DEACTIVATE_SIDEBAR_EDIT });
};
