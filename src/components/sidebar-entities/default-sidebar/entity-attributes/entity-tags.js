import React from 'react';
import PropTypes from 'prop-types';
import { X, Plus } from 'react-feather';
import { filter, includes, map, pull } from 'lodash';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import Header, { HeaderType } from 'primitives/text/header';
import Dropdown from 'primitives/form/dropdown';
import Button from 'primitives/other/button';
import LinkIcon from 'primitives/other/link-icon';

import Entities from 'constants/entities';

const renderList = (listLength, listKey, key) => (
  <div key={listKey} className="EntityAttributes-Content">
    <b>
      <FormattedMessage id={`misc.${listKey}`} />:
    </b>
    <ul className="EntityAttributes-ContentList">
      {[...Array(listLength).keys()].map(index => (
        <li key={`${listKey}-${index}`}>
          <FormattedMessage id={`tags.${key}.${listKey}.${index}`} />
        </li>
      ))}
    </ul>
  </div>
);

export default function EntityTags({
  entityType,
  entity,
  isSidebarEditActive,
  updateEntityInEdit,
  isOpen,
  toggleOpen,
  intl,
}) {
  if (
    !Entities[entityType].tags ||
    (!isSidebarEditActive && !(entity.attributes.tags || []).length)
  ) {
    return null;
  }

  let tags;
  const entityTags = (entity.attributes || {}).tags || [];
  if (isSidebarEditActive) {
    tags = entityTags.sort().map(tag => (
      <FlexContainer key={tag} align="center" className="EntityTag--edit">
        <X
          className="EntityTag-Action"
          size={25}
          onClick={() =>
            updateEntityInEdit({
              attributes: { tags: pull(entityTags, tag) },
            })
          }
        />
        <Dropdown
          wrapperClassName="EntityTag-Dropdown"
          value={tag}
          dropUp
          clearable={false}
          onChange={({ value }) =>
            updateEntityInEdit({
              attributes: {
                tags: pull(entityTags, tag).concat([value]),
              },
            })
          }
          options={filter(
            Entities[entityType].tags,
            ({ key }) => !includes(entity.attributes.tags, key) || key === tag,
          ).map(({ key }) => ({
            value: key,
            label: intl.formatMessage({ id: `tags.${key}` }),
          }))}
        />
      </FlexContainer>
    ));
  } else {
    tags = entityTags
      .map(tag => Entities[entityType].tags[tag])
      .map(({ key, name, description, ...lists }) => (
        <div key={key} className="EntityAttributes-Tag">
          <Header type={HeaderType.header4}>
            <FormattedMessage id={`tags.${key}`} />
          </Header>
          <p className="EntityAttributes-Content">
            <FormattedMessage id={`tags.${key}.description`} />
          </p>
          {map(lists, (listLength, listKey) =>
            renderList(listLength, listKey, key),
          )}
        </div>
      ));
  }

  let header = (
    <SectionHeader isOpen={isOpen} onClick={toggleOpen}>
      <span className="EntityTags-Name">
        <FormattedMessage
          id="misc.entityTags"
          values={{
            entity: intl.formatMessage({ id: Entities[entityType].name }),
          }}
        />
      </span>
    </SectionHeader>
  );
  if (isSidebarEditActive) {
    header = (
      <SectionHeader isOpen={isOpen} onIconClick={toggleOpen}>
        <FlexContainer justify="spaceBetween" align="flexEnd">
          <span className="EntityTags-Name" onClick={toggleOpen}>
            <FormattedMessage
              id="misc.entityTags"
              values={{
                entity: intl.formatMessage({ id: Entities[entityType].name }),
              }}
            />
          </span>
          <Button
            minimal
            className="EntityTags-AddButton"
            onClick={() => {
              const attributeTags = (entity.attributes || {}).tags || [];
              if (includes(attributeTags, '')) {
                return;
              }
              updateEntityInEdit({
                attributes: {
                  tags: attributeTags.concat(['']),
                },
              });
            }}
          >
            <LinkIcon size={15} icon={Plus} />
            <FormattedMessage
              id="misc.addEntityTag"
              values={{
                entity: intl.formatMessage({ id: Entities[entityType].name }),
              }}
            />
          </Button>
        </FlexContainer>
      </SectionHeader>
    );
  }

  let tagsSection = null;
  if (isOpen) {
    tagsSection = <div className="EntityAttributes-Section">{tags}</div>;
  }

  return (
    <div>
      {header}
      {tagsSection}
    </div>
  );
}

EntityTags.propTypes = {
  isSidebarEditActive: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    attributes: PropTypes.shape(),
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};
