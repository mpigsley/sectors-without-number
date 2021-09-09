import React from 'react';
import Chance from 'chance';
import PropTypes from 'prop-types';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';
import { EyeOff, RefreshCw, Settings } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import DeletableRow from 'primitives/form/deletable-row';
import Header, { HeaderType } from 'primitives/text/header';
import Dropdown from 'primitives/form/dropdown';
import LinkIcon from 'primitives/other/link-icon';
import Input from 'primitives/form/input';

import Entities from 'constants/entities';
import { sortByKey } from 'utils/common';
import {
  filter,
  includes,
  map,
  pull,
  without,
  keys,
  isNumber,
} from 'constants/lodash';

import styles from './styles.module.scss';

const ReactHint = ReactHintFactory(React);
const chance = new Chance();

const renderList = (listOrLength, listKey, key) => {
  const contentList = isNumber(listOrLength)
    ? [...Array(listOrLength).keys()]
    : listOrLength;
  return (
    <div key={listKey} className={styles.content}>
      <b>
        <FormattedMessage id={`misc.${listKey}`} />:
      </b>
      <ul className={styles.contentList}>
        {contentList.map((item) => (
          <li key={`${listKey}-${item}`}>
            <FormattedMessage
              id={`tags.${key}.${listKey}.${item}`}
              defaultMessage={`${item}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function EntityTags({
  customTags,
  entityType,
  entity,
  isSidebarEditActive,
  updateEntityInEdit,
  isOpen,
  toggleOpen,
  openCustomTagModal,
  intl,
  isShared,
}) {
  if (entityType === Entities.sector.key) {
    return null;
  }
  const entityTags = (entity.attributes || {}).tags || [];
  const allTags = {
    ...(Entities[entityType].tags || {}),
    ...customTags,
  };

  let tags;
  if (isSidebarEditActive) {
    tags = entityTags.sort().map((tag) => (
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
                  chance.pickone(without(keys(allTags), tag)),
                ],
              },
            })
          }
          options={filter(
            allTags,
            ({ key }) => !includes(entity.attributes.tags, key) || key === tag,
          )
            .map(({ key, name }) => ({
              value: key,
              label: intl.formatMessage({
                id: `tags.${key}`,
                defaultMessage: name,
              }),
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
      .map((tag) => allTags[tag])
      .filter(
        (tag) =>
          tag &&
          (!isShared || (entity.visibility || {})[`tag.${tag.key}`] !== false),
      )
      .map(({ key, name, description, ...lists }) => {
        let visibility;
        if (!isShared && (entity.visibility || {})[`tag.${key}`] === false) {
          visibility = <LinkIcon icon={EyeOff} size={18} />;
        }
        return (
          <div key={key} className={styles.tag}>
            <Header type={HeaderType.header4}>
              {visibility}
              <FormattedMessage id={`tags.${key}`} defaultMessage={name} />
            </Header>
            <p className={styles.content}>
              <FormattedMessage
                id={`tags.${key}.description`}
                defaultMessage={description}
              />
            </p>
            {map(lists, (list, listKey) => renderList(list, listKey, key))}
          </div>
        );
      });
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
        isShared ? null : (
          <Settings
            size={20}
            className={styles.customTagBtn}
            onClick={(e) => {
              e.stopPropagation();
              openCustomTagModal();
            }}
            data-rh={intl.formatMessage({ id: 'misc.configureTags' })}
          />
        )
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
  if (isOpen && tags.length) {
    tagsSection = <div className={styles.section}>{tags}</div>;
  } else if (isOpen && !isSidebarEditActive) {
    tagsSection = (
      <FlexContainer justify="center" className={styles.emptyTags}>
        <FormattedMessage id="misc.noTags" />
      </FlexContainer>
    );
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
  customTags: PropTypes.shape().isRequired,
  isSidebarEditActive: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    attributes: PropTypes.shape(),
    visibility: PropTypes.shape(),
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  openCustomTagModal: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  isShared: PropTypes.bool.isRequired,
};
