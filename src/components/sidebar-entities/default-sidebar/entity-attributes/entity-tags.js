import React from 'react';
import PropTypes from 'prop-types';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import Header, { HeaderType } from 'primitives/text/header';
import Dropdown from 'primitives/form/dropdown';
import Button from 'primitives/other/button';
import LinkIcon from 'primitives/other/link-icon';
import Input from 'primitives/form/input';

import { X, Plus, EyeOff } from 'constants/icons';
import Entities from 'constants/entities';
import { sortByKey } from 'utils/common';
import { filter, includes, map, pull } from 'constants/lodash';
import generateAttribute from 'utils/entity-generators/attribute-generator'

const ReactHint = ReactHintFactory(React);

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
  isShared,
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
              visibility: { [`tag.${tag}`]: undefined },
           })
          }
        />
        <Dropdown
          wrapperClassName="EntityTag-Dropdown"
          value={tag}
          clearable={false}
          onChange={({ value }) =>
            updateEntityInEdit({
              attributes: {
                tags: pull(entityTags, tag).concat([value]),
              },
            })
          }
          onGenerate={() => updateEntityInEdit({ attributes: { tags: pull(entityTags, tag).concat(generateAttribute(entityType, 'tags')) } })}
          options={filter(
            Entities[entityType].tags,
            ({ key }) => !includes(entity.attributes.tags, key) || key === tag,
          )
            .map(({ key }) => ({
              value: key,
              label: intl.formatMessage({ id: `tags.${key}` }),
            }))
            .sort(sortByKey('label', true))}
        />
        <Input
          className="EntityAttributes-Checkbox"
          disabled={!tag}
          checked={
            !tag || (entity.visibility || {})[`tag.${tag}`] === undefined
              ? false
              : !(entity.visibility || {})[`tag.${tag}`]
          }
          onChange={({ target }) =>
            updateEntityInEdit({
              visibility: {
                ...entity.visibility,
                [`tag.${tag}`]: !target.checked,
              },
            })
          }
          type="checkbox"
        />
      </FlexContainer>
    ));
  } else {
    tags = entityTags
      .map(tag => Entities[entityType].tags[tag])
      .filter(
        ({ key }) =>
          !isShared || (entity.visibility || {})[`tag.${key}`] !== false,
      )
      .map(({ key, name, description, ...lists }) => {
        let visibility;
        if (!isShared && (entity.visibility || {})[`tag.${key}`] === false) {
          visibility = <LinkIcon icon={EyeOff} size={18} />;
        }
        return (
          <div key={key} className="EntityAttributes-Tag">
            <Header type={HeaderType.header4}>
              {visibility}
              <FormattedMessage id={`tags.${key}`} />
            </Header>
            <p className="EntityAttributes-Content">
              <FormattedMessage id={`tags.${key}.description`} />
            </p>
            {map(lists, (listLength, listKey) =>
              renderList(listLength, listKey, key),
            )}
          </div>
        );
      });
  }

  if (!isSidebarEditActive && !tags.length) {
    return null;
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

  let subHeader = null;
  if (isSidebarEditActive && isOpen) {
    subHeader = (
      <FlexContainer
        justify="flexEnd"
        align="center"
        className="EntityAttributes-SubHeader"
      >
        <LinkIcon
          data-rh={intl.formatMessage({ id: 'misc.selectHidden' })}
          className="EntityAttributes-SubHeaderHidden"
          icon={EyeOff}
          size={18}
        />
      </FlexContainer>
    );
  }

  return (
    <div>
      {header}
      {subHeader}
      {tagsSection}
      <ReactHint events position="left" />
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
  isShared: PropTypes.bool.isRequired,
};
