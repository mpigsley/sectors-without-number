import mapValues from 'lodash/mapValues';
import sortBy from 'lodash/sortBy';
import pickBy from 'lodash/pickBy';
import size from 'lodash/size';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import zipObject from 'lodash/zipObject';
import isNumber from 'lodash/isNumber';

import {
  getEmptyHexKeys,
  getCurrentEntity,
  getCurrentEntityId,
  getCurrentEntityType,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';
import {
  sidebarEditEntitySelector,
  sidebarEditChildrenSelector,
  syncLockSelector,
} from 'store/selectors/base.selectors';
import Entities from 'constants/entities';
import { createId, coordinatesFromKey, coordinateKey } from 'utils/common';
import { syncLock } from 'utils/entity';

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
  if (syncLockSelector(state)) {
    return Promise.resolve();
  }
  const entity = getCurrentEntity(state);
  const childrenByType = getCurrentEntityChildren(state);
  return dispatch({
    type: ACTIVATE_SIDEBAR_EDIT,
    entity: omitBy(
      {
        name: entity.name,
        attributes: entity.attributes
          ? { ...entity.attributes, tags: [...(entity.attributes.tags || [])] }
          : undefined,
        visibility: entity.visibility || {},
        isHidden: entity.isHidden,
      },
      isNil,
    ),
    children: pickBy(
      mapValues(childrenByType, childType => {
        const sortedChildren = sortBy(
          mapValues(childType, ({ name, x, y, isHidden }, key) => ({
            key,
            name,
            x,
            y,
            isHidden,
          })),
          ({ x, y, name }) =>
            isNumber(x) && isNumber(y) ? coordinateKey(x, y) : name,
        );

        return zipObject(
          sortedChildren.map(({ key }) => key),
          sortedChildren.map((child, index) =>
            omitBy(
              {
                ...child,
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

export const updateEntityInEdit = changes => (dispatch, getState) => {
  const state = getState();
  if (syncLockSelector(state)) {
    return Promise.resolve();
  }
  const entityId = getCurrentEntityId(state);
  const entityType = getCurrentEntityType(state);
  const entity = sidebarEditEntitySelector(state);
  const updates = {
    ...changes,
    attributes: omitBy(
      {
        ...(entity.attributes || {}),
        ...(changes.attributes || {}),
      },
      isNil,
    ),
    visibility: omitBy(
      {
        ...(entity.visibility || {}),
        ...(changes.visibility || {}),
      },
      isNil,
    ),
  };

  return dispatch({
    type: UPDATE_ENTITY_IN_EDIT,
    entityId,
    entityType,
    updates,
  });
};

export const deleteChildInEdit = (entityType, entityId) =>
  syncLock(DELETE_CHILD_IN_EDIT, { entityType, entityId });
export const undoDeleteChildInEdit = (entityType, entityId) =>
  syncLock(UNDO_DELETE_CHILD_IN_EDIT, { entityType, entityId });
export const updateChildInEdit = (entityType, entityId, updates) =>
  syncLock(UPDATE_CHILD_IN_EDIT, { entityType, entityId, updates });

export const createChildInEdit = entityType => (dispatch, getState) => {
  const state = getState();
  if (syncLockSelector(state)) {
    return Promise.resolve();
  }
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
