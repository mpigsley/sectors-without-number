import { push } from 'react-router-redux';

import {
  configurationSelector,
  currentSectorSelector,
  entitySelector,
} from 'store/selectors/base.selectors';
import {
  getCurrentEntityType,
  getCurrentEntityId,
} from 'store/selectors/entity.selectors';
import {
  generateEntity as generateEntityUtil,
  deleteEntity as deleteEntityUtil,
} from 'utils/entity';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';
export const UPDATE_ENTITY = 'UPDATE_ENTITY';
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

export const updateEntity = update => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: UPDATE_ENTITY,
    entityType: getCurrentEntityType(state),
    entity: getCurrentEntityId(state),
    update,
  });
};

export const deleteEntity = () => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: DELETE_ENTITIES,
    entities: deleteEntityUtil({
      entityType: getCurrentEntityType(state),
      entity: getCurrentEntityId(state),
      entities: entitySelector(state),
    }),
  });
};
