import { createSelector } from 'reselect';

import {
  customTagSelector,
  currentEntityTypeSelector,
} from 'store/selectors/base.selectors';
import { pickBy, includes, mapValues, omit } from 'constants/lodash';

const getNormalizedTags = createSelector(
  [customTagSelector],
  tags => mapValues(tags, (tag, key) => ({ ...omit(tag, 'creator'), key })),
);

// eslint-disable-next-line import/prefer-default-export
export const getTagsForCurrentEntity = createSelector(
  [getNormalizedTags, currentEntityTypeSelector],
  (tags, entityType) =>
    mapValues(pickBy(tags, tag => includes(tag.types, entityType)), tag =>
      omit(tag, 'types'),
    ),
);
