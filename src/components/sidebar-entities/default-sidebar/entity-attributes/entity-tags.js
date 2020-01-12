import React from 'react';
import PropTypes from 'prop-types';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';
import Chance from 'chance';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import DeletableRow from 'primitives/form/deletable-row';
import Header, { HeaderType } from 'primitives/text/header';
import Dropdown from 'primitives/form/dropdown';
import LinkIcon from 'primitives/other/link-icon';
import Input from 'primitives/form/input';

import { EyeOff, RefreshCw, Settings } from 'constants/icons';
import Entities from 'constants/entities';
import { sortByKey } from 'utils/common';
import { filter, includes, map, pull, without } from 'constants/lodash';

import styles from './styles.module.scss';

const ReactHint = ReactHintFactory(React);
const chance = new Chance();

const renderList = (listLength, listKey, key) => (
  <div key={listKey} className={styles.content}>
    <b>
      <FormattedMessage id={`misc.${listKey}`} />:
    </b>
    <ul className={styles.contentList}>
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
  const entityTags = (entity.attributes || {}).tags || [];
  if (
    !Entities[entityType].tags ||
    (!isSidebarEditActive && !entityTags.length)
  ) {
    return null;
  }

  let tags;
  if (isSidebarEditActive) {
    tags = entityTags.sort().map(tag => (
      <DeletableRow
        key={tag}
        align="center"
        className={styles.entityTagEdit}
        onAction={() =>
          updateEntityInEdit({
            attributes: { tags: pull(entityTags, tag) },
            visibility: { [`tag.${tag}`]: undefined },
          })
        }
      >
        <Dropdown
          wrapperClassName={styles.dropdown}
          value={tag}
          clearable={false}
          onChange={({ value }) =>
            updateEntityInEdit({
              attributes: {
                tags: pull(entityTags, tag).concat([value]),
              },
            })
          }
          icon={RefreshCw}
          onItemClick={() =>
            updateEntityInEdit({
              attributes: {
                tags: [
                  ...without(entityTags, tag),
                  chance.pickone(
                    without(Object.keys(Entities[entityType].tags), tag),
                  ),
                ],
              },
            })
          }
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
          className={styles.checkbox}
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
      </DeletableRow>
    ));
  } else {
    tags = entityTags
      .map(tag => Entities[entityType].tags[tag])
      .filter(
        ({ key }) =>
          !isShared || (entity.visibility || {})[`tag.${key}`] !== false,
      )
      .map(({ key, name, ...lists }) => {
        let visibility;
        if (!isShared && (entity.visibility || {})[`tag.${key}`] === false) {
          visibility = <LinkIcon icon={EyeOff} size={18} />;
        }
        return (
          <div key={key} className={styles.tag}>
            <Header type={HeaderType.header4}>
              {visibility}
              <FormattedMessage id={`tags.${key}`} />
            </Header>
            <p className={styles.content}>
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
    <SectionHeader
      header={
        <FormattedMessage
          id="misc.entityTags"
          values={{
            entity: intl.formatMessage({ id: Entities[entityType].name }),
          }}
        />
      }
      additional={
        <Settings
          size={20}
          className={styles.customTagBtn}
          onClick={e => {
            e.stopPropagation();
            // open modal
          }}
          data-rh={intl.formatMessage({ id: 'misc.configureTags' })}
        />
      }
      isOpen={isOpen}
      onClick={toggleOpen}
    />
  );
  if (isSidebarEditActive) {
    header = (
      <SectionHeader
        header={
          <FormattedMessage
            id="misc.entityTags"
            values={{
              entity: intl.formatMessage({ id: Entities[entityType].name }),
            }}
          />
        }
        isOpen={isOpen}
        onIconClick={toggleOpen}
        addItemTemplate="misc.addEntityTag"
        addItemName={Entities[entityType].name}
        onAdd={() => {
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
      />
    );
  }

  let tagsSection = null;
  if (isOpen) {
    tagsSection = <div className={styles.section}>{tags}</div>;
  }

  let subHeader = null;
  if (isSidebarEditActive && isOpen) {
    subHeader = (
      <FlexContainer
        justify="flexEnd"
        align="center"
        className={styles.subHeader}
      >
        <LinkIcon
          data-rh={intl.formatMessage({ id: 'misc.selectHidden' })}
          className={styles.subHeaderHidden}
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
    visibility: PropTypes.shape(),
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  isShared: PropTypes.bool.isRequired,
};
