import { LOCATION_CHANGE } from 'react-router-redux';

import {
  ACTIVATED_EDIT,
  DEACTIVATED_EDIT,
  UPDATED_ENTITY_IN_EDIT,
  DELETED_CHILD_IN_EDIT,
  UNDO_DELETE_CHILD_IN_EDIT,
  UPDATED_CHILD_IN_EDIT,
  CREATED_CHILD_IN_EDIT,
} from 'store/actions/sidebar.actions';
import { UPDATED_ENTITIES } from 'store/actions/entity.actions';
import { omit, omitBy, isNil } from 'constants/lodash';

const initialState = {
  isSidebarEditActive: false,
  entity: {},
  children: {},
};

export default function sidebarEdit(state = initialState, action) {
  switch (action.type) {
  case ACTIVATED_EDIT:
    return {
      ...state,
      isSidebarEditActive: true,
      entity: action.entity,
      children: action.children,
    };
  case UPDATED_ENTITIES:
  case DEACTIVATED_EDIT:
  case LOCATION_CHANGE:
    return initialState;
  case UPDATED_ENTITY_IN_EDIT:
    return {
      ...state,
      entity: omitBy(
        {
          ...state.entity,
          ...action.updates,
          isUpdated: true,
        },
        isNil,
      ),
    };
  case DELETED_CHILD_IN_EDIT: {
    let entityTypeList;
    const doDelete =
        state.children[action.entityType][action.entityId].isCreated;
    if (doDelete) {
      entityTypeList = omit(
        state.children[action.entityType],
        action.entityId,
      );
    } else {
      entityTypeList = {
        ...state.children[action.entityType],
        [action.entityId]: {
          ...state.children[action.entityType][action.entityId],
          isDeleted: true,
        },
      };
    }
    return {
      ...state,
      children: {
        ...state.children,
        [action.entityType]: entityTypeList,
      },
    };
  }
  case UNDO_DELETE_CHILD_IN_EDIT:
    return {
      ...state,
      children: {
        ...state.children,
        [action.entityType]: {
          ...state.children[action.entityType],
          [action.entityId]: {
            ...state.children[action.entityType][action.entityId],
            isDeleted: false,
          },
        },
      },
    };
  case UPDATED_CHILD_IN_EDIT:
    return {
      ...state,
      children: {
        ...state.children,
        [action.entityType]: {
          ...state.children[action.entityType],
          [action.entityId]: {
            ...state.children[action.entityType][action.entityId],
            ...action.updates,
            isUpdated: true,
          },
        },
      },
    };
  case CREATED_CHILD_IN_EDIT:
    return {
      ...state,
      children: {
        ...state.children,
        [action.entityType]: {
          ...state.children[action.entityType],
          [action.entityId]: {
            ...action.entity,
            isCreated: true,
          },
        },
      },
    };
  default:
    return state;
  }
}
