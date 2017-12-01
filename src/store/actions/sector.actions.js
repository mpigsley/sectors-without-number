import { mapValues, pickBy, size } from 'lodash';

import {
  getCurrentEntity,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';

export const UPDATE_CONFIGURATION = 'UPDATE_CONFIGURATION';
export const ACTIVATE_SIDEBAR_EDIT = 'ACTIVATE_SIDEBAR_EDIT';
export const DEACTIVATE_SIDEBAR_EDIT = 'DEACTIVATE_SIDEBAR_EDIT';
export const DELETE_ENTITY_IN_EDIT = 'DELETE_ENTITY_IN_EDIT';

export const updateConfiguration = (key, value) => ({
  type: UPDATE_CONFIGURATION,
  key,
  value,
});

export const deactivateSidebarEdit = () => ({ type: DEACTIVATE_SIDEBAR_EDIT });
export const activateSidebarEdit = () => (dispatch, getState) => {
  const state = getState();
  const entity = getCurrentEntity(state);
  const childrenByType = getCurrentEntityChildren(state);
  return dispatch({
    type: ACTIVATE_SIDEBAR_EDIT,
    entity: { ...entity.attributes, name: entity.name },
    children: pickBy(
      mapValues(childrenByType, childType =>
        mapValues(childType, child => ({
          name: child.name,
          x: child.x,
          y: child.y,
        })),
      ),
      size,
    ),
  });
};

export const deleteEntityInEdit = (entityType, entityId) => ({
  type: DELETE_ENTITY_IN_EDIT,
  entityType,
  entityId,
});
