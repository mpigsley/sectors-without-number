import { createSelector } from 'reselect';

import {
  userUidSelector,
  customTagSelector,
  currentEntityTypeSelector,
} from 'store/selectors/base.selectors';
import { pickBy, includes, mapValues, omit } from 'constants/lodash';

export const getUsersCustomTags = createSelector(
  [customTagSelector, userUidSelector],
  (tags, uid) => (!uid ? tags : pickBy(tags, tag => tag.creator === uid)),
);

const getNormalizedTags = createSelector([getUsersCustomTags], tags =>
  mapValues(tags, (tag, key) => ({ ...omit(tag, 'creator'), key })),
);

export const getTagsForCurrentEntity = createSelector(
  [getNormalizedTags, currentEntityTypeSelector],
  (tags, entityType) =>
    mapValues(
      pickBy(tags, tag => includes(tag.types, entityType)),
      tag => omit(tag, 'types'),
    ),
);
