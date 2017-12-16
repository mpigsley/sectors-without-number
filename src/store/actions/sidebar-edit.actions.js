import {
  mapValues,
  sortBy,
  pickBy,
  size,
  omitBy,
  isNil,
  zipObject,
  isNumber,
} from 'lodash';

import {
  getCurrentEntity,
  getCurrentEntityId,
  getCurrentEntityType,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';
import { sidebarEditChildrenSelector } from 'store/selectors/base.selectors';
import { getEmptyHexKeys } from 'store/selectors/sector.selectors';
import Entities from 'constants/entities';
import { createId, coordinatesFromKey, coordinateKey } from 'utils/common';

export const ACTIVATE_SIDEBAR_EDIT = 'ACTIVATE_SIDEBAR_EDIT';
export const DEACTIVATE_SIDEBAR_EDIT = 'DEACTIVATE_SIDEBAR_EDIT';

export const UPDATE_ENTITY_IN_EDIT = 'UPDATE_ENTITY_IN_EDIT';
export const DELETE_CHILD_IN_EDIT = 'DELETE_CHILD_IN_EDIT';
export const UNDO_DELETE_CHILD_IN_EDIT = 'UNDO_DELETE_CHILD_IN_EDIT';
export const UPDATE_CHILD_IN_EDIT = 'UPDATE_CHILD_IN_EDIT';
export const CREATE_CHILD_IN_EDIT = 'CREATE_CHILD_IN_EDIT';

export const deactivateSidebarEdit = () => ({ type: DEACTIVATE_SIDEBAR_EDIT });
export const activateSidebarEdit = () => (dispatch, getState) => {
  const state = getState();
  const entity = getCurrentEntity(state);
  const childrenByType = getCurrentEntityChildren(state);
  return dispatch({
    type: ACTIVATE_SIDEBAR_EDIT,
    entity: omitBy({ name: entity.name, attributes: entity.attributes }, isNil),
    children: pickBy(
      mapValues(childrenByType, childType => {
        const sortedChildren = sortBy(
          mapValues(childType, (child, key) => ({
            key,
            name: child.name,
            x: child.x,
            y: child.y,
          })),
          ({ x, y, name }) =>
            isNumber(x) && isNumber(y) ? coordinateKey(x, y) : name,
        );

        return zipObject(
          sortedChildren.map(({ key }) => key),
          sortedChildren.map(({ x, y, name }, index) =>
            omitBy(
              {
                x,
                y,
                name,
                sort: sortedChildren.length - index - 1,
              },
              isNil,
            ),
          ),
        );
      }),
      size,
    ),
  });
};

export const updateEntityInEdit = updates => (dispatch, getState) => {
  const state = getState();
  const entityId = getCurrentEntityId(state);
  const entityType = getCurrentEntityType(state);
  return dispatch({
    type: UPDATE_ENTITY_IN_EDIT,
    entityId,
    entityType,
    updates,
  });
};

export const deleteChildInEdit = (entityType, entityId) => ({
  type: DELETE_CHILD_IN_EDIT,
  entityType,
  entityId,
});

export const undoDeleteChildInEdit = (entityType, entityId) => ({
  type: UNDO_DELETE_CHILD_IN_EDIT,
  entityType,
  entityId,
});

export const updateChildInEdit = (entityType, entityId, updates) => ({
  type: UPDATE_CHILD_IN_EDIT,
  entityType,
  entityId,
  updates,
});

export const createChildInEdit = entityType => (dispatch, getState) => {
  const state = getState();
  const entityChildren = sidebarEditChildrenSelector(state)[entityType];
  return dispatch({
    type: CREATE_CHILD_IN_EDIT,
    entityType,
    entityId: createId(),
    entity: {
      name: Entities[entityType].nameGenerator(),
      ...coordinatesFromKey(getEmptyHexKeys(state)[0]),
      generate: true,
      sort: size(entityChildren),
    },
  });
};
