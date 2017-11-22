import { zipObject } from 'lodash';
import { push } from 'react-router-redux';

import EntityGenerators from 'utils/entity-generators';
import { createId } from 'utils/common';
import Entities from 'constants/entities';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';
export const UPDATE_ENTITY = 'UPDATE_ENTITY';

const recursivelyGenerateEntities = ({ entity, state, parameters }) => {
  const entityId = createId();
  const sector =
    entity === Entities.sector.key ? entityId : state.sector.currentSector;
  const config = state.sector.configuration;

  let childrenEntities = {};
  const generateChildren = (parent, parentEntity) =>
    Entities[parentEntity].children.map(childEntity => {
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
      return Object.keys(childrenObj).map(newKey =>
        generateChildren(newKey, childEntity),
      );
    });

  generateChildren(entityId, entity);

  return {
    [entity]: {
      [entityId]: EntityGenerators[entity].generateOne(config, parameters),
    },
    ...childrenEntities,
  };
};

export const generateEntity = (entity, parameters) => (dispatch, getState) => {
  const state = getState();
  const entities = recursivelyGenerateEntities({ entity, state, parameters });
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

export const updateEntity = (entityType, entityId, update) => dispatch =>
  dispatch({
    type: UPDATE_ENTITY,
    entityType,
    entityId,
    update,
  });

export const deleteEntity = () => {};
