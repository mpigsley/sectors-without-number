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
import {
  mapValues,
  sortBy,
  pickBy,
  size,
  omitBy,
  isNil,
  zipObject,
  isNumber,
  includes,
} from 'constants/lodash';

const ACTION_PREFIX = '@@sidebar';
export const ACTIVATED_EDIT = `${ACTION_PREFIX}/ACTIVATED_EDIT`;
export const DEACTIVATED_EDIT = `${ACTION_PREFIX}/DEACTIVATED_EDIT`;
export const UPDATED_ENTITY_IN_EDIT = `${ACTION_PREFIX}/UPDATED_ENTITY_IN_EDIT`;
export const DELETED_CHILD_IN_EDIT = `${ACTION_PREFIX}/DELETED_CHILD_IN_EDIT`;
export const UNDO_DELETE_CHILD_IN_EDIT = `${ACTION_PREFIX}/UNDO_DELETE_CHILD_IN_EDIT`;
export const UPDATED_CHILD_IN_EDIT = `${ACTION_PREFIX}/UPDATED_CHILD_IN_EDIT`;
export const CREATED_CHILD_IN_EDIT = `${ACTION_PREFIX}/CREATED_CHILD_IN_EDIT`;

export const deactivateSidebarEdit = () => ({ type: DEACTIVATED_EDIT });
export const activateSidebarEdit = () => (dispatch, getState) => {
  const state = getState();
  if (syncLockSelector(state)) {
    return Promise.resolve();
  }
  const entity = getCurrentEntity(state);
  const childrenByType = getCurrentEntityChildren(state);
  return dispatch({
    type: ACTIVATED_EDIT,
    entity: omitBy(
      {
        name: entity.name,
        image: entity.image || '',
        attributes: entity.attributes
          ? { ...entity.attributes, tags: [...(entity.attributes.tags || [])] }
          : undefined,
        visibility: entity.visibility || {},
        isHidden: entity.isHidden,
      },
      isNil,
    ),
    children: pickBy(
      mapValues(childrenByType, (childType) => {
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

export const updateEntityInEdit = (changes) => (dispatch, getState) => {
  const state = getState();
  if (syncLockSelector(state)) {
    return Promise.resolve();
  }
  const entityId = getCurrentEntityId(state);
  const entityType = getCurrentEntityType(state);
  const entity = sidebarEditEntitySelector(state);
  const attributes = omitBy(
    {
      ...(entity.attributes || {}),
      ...(changes.attributes || {}),
    },
    isNil,
  );
  const visibility = omitBy(
    {
      ...(entity.visibility || {}),
      ...(changes.visibility || {}),
    },
    (item, key) => {
      const [type, specifier] = key.split('.');
      const tagNotIncluded =
        type === 'tag' && !includes(attributes.tags, specifier);
      return isNil(item) || tagNotIncluded;
    },
  );

  return dispatch({
    type: UPDATED_ENTITY_IN_EDIT,
    entityId,
    entityType,
    updates: {
      ...changes,
      attributes,
      visibility,
    },
  });
};

export const deleteChildInEdit = (entityType, entityId) =>
  syncLock(DELETED_CHILD_IN_EDIT, { entityType, entityId });
export const undoDeleteChildInEdit = (entityType, entityId) =>
  syncLock(UNDO_DELETE_CHILD_IN_EDIT, { entityType, entityId });
export const updateChildInEdit = (entityType, entityId, updates) =>
  syncLock(UPDATED_CHILD_IN_EDIT, { entityType, entityId, updates });

export const createChildInEdit = (entityType) => (dispatch, getState) => {
  const state = getState();
  if (syncLockSelector(state)) {
    return Promise.resolve();
  }
  const entityChildren = sidebarEditChildrenSelector(state)[entityType];
  return dispatch({
    type: CREATED_CHILD_IN_EDIT,
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
