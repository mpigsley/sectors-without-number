import { userUidSelector } from 'store/selectors/base.selectors';
import {
  createCustomTag,
  updateCustomTag,
  deleteCustomTag,
} from 'store/api/tag';
import { ErrorToast } from 'utils/toasts';

const ACTION_PREFIX = '@@tag';
export const OPEN_MODAL = `${ACTION_PREFIX}/OPEN_MODAL`;
export const CLOSE_MODAL = `${ACTION_PREFIX}/CLOSE_MODAL`;
export const ITEM_ADDED = `${ACTION_PREFIX}/ITEM_ADDED`;
export const ITEM_DELETED = `${ACTION_PREFIX}/ITEM_DELETED`;

export const openCustomTagModal = () => ({ type: OPEN_MODAL });
export const closeCustomTagModal = () => ({ type: CLOSE_MODAL });

export const createTag = (intl, newTag) => (dispatch, getState) => {
  const state = getState();
  const uid = userUidSelector(state);
  return createCustomTag(uid, newTag)
    .then(({ tagId, tag }) => {
      dispatch({ type: ITEM_ADDED, item: { [tagId]: tag } });
      return tagId;
    })
    .catch(err => {
      console.error(err);
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const editTag = (intl, tagId, tagUpdate) => dispatch =>
  updateCustomTag(tagId, tagUpdate)
    .then(update =>
      dispatch({ type: ITEM_ADDED, item: { [update.tagId]: update.tag } }),
    )
    .catch(err => {
      console.error(err);
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });

export const deleteTag = (intl, tagId) => dispatch =>
  deleteCustomTag(tagId)
    .then(() => dispatch({ type: ITEM_DELETED, item: tagId }))
    .catch(err => {
      console.error(err);
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
