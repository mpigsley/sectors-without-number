import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import ReactHintFactory from 'react-hint';
import { RefreshCw, EyeOff } from 'react-feather';

import EntityAttribute from 'components/sidebar-entities/default-sidebar/entity-attribute';
import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import BasicLink from 'primitives/other/basic-link';
import LinkIcon from 'primitives/other/link-icon';
import Input from 'primitives/form/input';
import LabeledItem from 'primitives/other/labeled-item';
import LabeledInput from 'primitives/form/labeled-input';

import { omit, values, size } from 'constants/lodash';
import Entities from 'constants/entities';

import styles from './styles.module.scss';

const ReactHint = ReactHintFactory(React);

const renderLinkList = (label, items) => (
  <LabeledItem label={label} isVertical>
    <ul>
      {items.map(({ key, name, link }) => (
        <li key={key}>
          <BasicLink to={link}>{name}</BasicLink>
        </li>
      ))}
    </ul>
  </LabeledItem>
);

export default function EntityAttributes({
  isSidebarEditActive,
  entity,
  entityType,
  entityAttributes,
  updateEntityInEdit,
  isOpen,
  toggleOpen,
  isAncestorHidden,
  intl,
}) {
  const noAttributes = !size(entityAttributes);
  if (!isSidebarEditActive && noAttributes) {
    return null;
  }

  let attributesSection = null;
  const hasNonTagAttributes = values(
    omit({ ...entityAttributes }, 'tags'),
  ).filter((v) => v).length;

  if (isSidebarEditActive || hasNonTagAttributes) {
    let nameAttribute = null;
    let imageAttribute = null;
    let hiddenAttribute = null;
    let descriptionAttribute = null;
    let factionsAttribute = null;
    let assetsAttribute = null;
    if (isSidebarEditActive) {
      nameAttribute = (
        <LabeledInput
          label="misc.name"
          value={entity.name}
          onChange={({ target }) => updateEntityInEdit({ name: target.value })}
          onIconClick={() =>
            updateEntityInEdit({
              name: Entities[entityType].nameGenerator(),
            })
          }
          icon={RefreshCw}
          checkboxes={[
            <Input
              key="checkbox"
              disabled
              checked={false}
              onChange={() => {}}
              type="checkbox"
            />,
          ]}
        />
      );
      imageAttribute = (
        <LabeledInput
          label="misc.image"
          value={entity.image}
          onChange={({ target }) => updateEntityInEdit({ image: target.value })}
          checkboxes={[
            <Input
              key="checkbox"
              checked={
                (entity.visibility || {})['attr.image'] === undefined
                  ? false
                  : !(entity.visibility || {})['attr.image']
              }
              onChange={({ target }) =>
                updateEntityInEdit({
                  visibility: {
                    ...entity.visibility,
                    'attr.image': !target.checked,
                  },
                })
              }
              type="checkbox"
            />,
          ]}
        />
      );
      descriptionAttribute = (
        <LabeledInput
          label="misc.description"
          rows="5"
          type="textarea"
          placeholder={intl.formatMessage({ id: 'misc.description' })}
          value={entityAttributes.description || ''}
          onChange={({ target } = {}) =>
            updateEntityInEdit({ attributes: { description: target.value } })
          }
        />
      );
      if (entityType !== Entities.sector.key) {
        hiddenAttribute = (
          <LabeledInput
            label="misc.isHidden"
            type="checkbox"
            checked={!!entity.isHidden || isAncestorHidden}
            disabled={isAncestorHidden}
            onChange={({ target } = {}) =>
              updateEntityInEdit({ isHidden: target.checked })
            }
          />
        );
      }
    } else {
      if (entityAttributes.factions) {
        factionsAttribute = renderLinkList(
          'misc.factions',
          entityAttributes.factions,
        );
      }
      if (entityAttributes.assets) {
        assetsAttribute = renderLinkList(
          'misc.assets',
          entityAttributes.assets.map(({ type, faction, ...asset }) => ({
            ...asset,
            name: `${faction} - ${intl.formatMessage({
              id: `faction.assets.${type}`,
            })}`,
          })),
        );
      }
      if (entityAttributes.description) {
        descriptionAttribute = (
          <LabeledItem label="misc.description" isVertical>
            <span className={styles['container--itemMultiline']}>
              {entityAttributes.description}
            </span>
          </LabeledItem>
        );
      }
    }

    let attributes = null;
    if (isOpen) {
      attributes = (
        <FlexContainer direction="column" className={styles.attributes}>
          {nameAttribute}
          {imageAttribute}
          {(Entities[entityType].attributes || []).map((attribute) => (
            <EntityAttribute
              key={attribute.key}
              attribute={attribute}
              entityAttribute={entityAttributes[attribute.key]}
            />
          ))}
          {factionsAttribute}
          {assetsAttribute}
          {hiddenAttribute}
          {descriptionAttribute}
        </FlexContainer>
      );
    }

    const renderSubHeader = () => {
      if (!isSidebarEditActive || !isOpen) {
        return null;
      }
      return (
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
    };

    attributesSection = (
      <div key="attributes">
        <SectionHeader
          header="misc.attributes"
          isOpen={isOpen}
          onClick={toggleOpen}
        />
        {renderSubHeader()}
        {attributes}
      </div>
    );
  }

  return (
    <>
      {attributesSection}
      <ReactHint events position="left" />
    </>
  );
}

EntityAttributes.propTypes = {
  isSidebarEditActive: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    visibility: PropTypes.shape(),
    image: PropTypes.string,
    isHidden: PropTypes.bool,
  }).isRequired,
  entityAttributes: PropTypes.shape({
    description: PropTypes.string,
    factions: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
    assets: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        faction: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  isAncestorHidden: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};
