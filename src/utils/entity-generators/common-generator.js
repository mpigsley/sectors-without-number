import Chance from 'chance';

import Entities from 'constants/entities';
import { includes, keys, pickBy, zipObject } from 'constants/lodash';

const generateRandomTags = ({ entityType, customTags }) => {
  const tagKeys = keys({
    ...(Entities[entityType].tags || {}),
    ...pickBy(customTags, tag => includes(tag.types, entityType)),
  });
  return new Chance().pickset(tagKeys, Math.min(2, tagKeys.length));
};

export default customGenerator => (entityType, config = {}) => {
  const {
    sector,
    parent,
    parentEntity,
    generate = true,
    hideTags = false,
    isHidden = false,
    useCustomTags = true,
    name = Entities[entityType].nameGenerator(),
    customTags = {},
  } = config;

  if (!sector) {
    throw new Error('Sector must be defined to generate this entity');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate this entity',
    );
  }

  let entity = {
    name,
    parent,
    parentEntity,
    sector,
    attributes: {},
    visibility: {},
  };
  if (isHidden !== undefined) {
    entity = { ...entity, isHidden };
  }
  if (generate) {
    const tags = generateRandomTags({
      customTags: useCustomTags ? customTags : {},
      entityType,
    });
    let visibility = {};
    if (hideTags) {
      visibility = zipObject(
        tags.map(tag => `tag.${tag}`),
        tags.map(() => false),
      );
    }
    entity = { ...entity, visibility, attributes: { tags } };
  }

  return customGenerator(entity, config);
};
