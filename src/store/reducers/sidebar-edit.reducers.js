import { omit } from 'lodash';

import {
  ACTIVATE_SIDEBAR_EDIT,
  DEACTIVATE_SIDEBAR_EDIT,
  UPDATE_ENTITY_IN_EDIT,
  DELETE_CHILD_IN_EDIT,
  UNDO_DELETE_CHILD_IN_EDIT,
  UPDATE_CHILD_IN_EDIT,
  CREATE_CHILD_IN_EDIT,
} from 'store/actions/sidebar-edit.actions';
import { UPDATE_ENTITIES } from 'store/actions/entity.actions';

const initialState = {
  isSidebarEditActive: false,
  entity: {},
  children: {},
};

export default function sidebarEdit(state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_SIDEBAR_EDIT:
      return {
        ...state,
        isSidebarEditActive: true,
        entity: action.entity,
        children: action.children,
      };
    case UPDATE_ENTITIES:
    case DEACTIVATE_SIDEBAR_EDIT:
      return initialState;
    case UPDATE_ENTITY_IN_EDIT:
      return {
        ...state,
        entity: {
          ...state.entity,
          ...action.updates,
          attributes: {
            ...state.entity.attributes,
            ...action.updates.attributes,
          },
        },
      };
    case DELETE_CHILD_IN_EDIT: {
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
    case UPDATE_CHILD_IN_EDIT:
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
    case CREATE_CHILD_IN_EDIT:
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
