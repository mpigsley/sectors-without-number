import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';
import classNames from 'classnames';
import Chance from 'chance';
import { without } from 'lodash';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import LinkIcon from 'primitives/other/link-icon';
import Input from 'primitives/form/input';
import LabeledItem from 'primitives/other/labeled-item';
import LabeledInput from 'primitives/form/labeled-input';

import { omit, map, values, pickBy, size } from 'constants/lodash';
import { RefreshCw, EyeOff } from 'constants/icons';
import Entities from 'constants/entities';

import EntityTags from './entity-tags';
import './style.css';

const ReactHint = ReactHintFactory(React);
const chance = new Chance();

export default function EntityAttributes({
  isSidebarEditActive,
  entity,
  entityType,
  updateEntityInEdit,
  isAttributesOpen,
  isTagsOpen,
  toggleAttributesOpen,
  toggleTagsOpen,
  isAncestorHidden,
  intl,
  isShared,
}) {
  const hiddenAttributes = isShared
    ? Object.keys(pickBy(entity.visibility, vision => vision === false)).map(
        key => key.replace('attr.', ''),
      )
    : [];
  const allAttributes = omit(entity.attributes, hiddenAttributes);
  const noAttributes = !entity.attributes || !size(allAttributes);
  if (!isSidebarEditActive && noAttributes) {
    return null;
  }

  let attributesSection = null;
  const hasNonTagAttributes = values(omit({ ...allAttributes }, 'tags')).filter(
    v => v,
  ).length;

  if (isSidebarEditActive || hasNonTagAttributes) {
    let nameAttribute = null;
    let hiddenAttribute = null;
    let descriptionAttribute = null;
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
      descriptionAttribute = (
        <LabeledInput
          label="misc.description"
          rows="5"
          type="textarea"
          placeholder={intl.formatMessage({ id: 'misc.description' })}
          value={(entity.attributes || {}).description || ''}
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
    } else if ((entity.attributes || {}).description) {
      descriptionAttribute = (
        <LabeledItem label="misc.description" isVertical>
          <span className="EntityAttributes--itemMultiline">
            {(entity.attributes || {}).description}
          </span>
        </LabeledItem>
      );
    }

    const renderAttribute = (
      { key, name, attributes }, // eslint-disable-line react/prop-types
      attribute,
      visibility,
    ) => {
      if (!attributes || !attribute || (visibility === false && isShared)) {
        return null;
      }

      return (
        <LabeledItem
          key={key}
          label={name}
          className={classNames({
            'EntityAttributes--itemHidden': visibility === false,
          })}
        >
          {attributes[attribute] ? (
            <FormattedMessage id={attributes[attribute].name} />
          ) : (
            attribute
          )}
        </LabeledItem>
      );
    };

    // eslint-disable-next-line react/prop-types
    const renderAttributeEdit = ({ key, name, attributes }, attribute) => (
      <LabeledInput
        key={key}
        label={name}
        type="dropdown"
        allowCreate
        value={attribute}
        onChange={item =>
          updateEntityInEdit({ attributes: { [key]: (item || {}).value } })
        }
        icon={RefreshCw}
        onItemClick={() =>
          updateEntityInEdit({
            attributes: {
              [key]: chance.pickone(
                without(Object.keys(attributes), attribute),
              ),
            },
          })
        }
        options={[
          ...map(attributes, attr => ({
            value: attr.key,
            label: intl.formatMessage({ id: attr.name }),
          })),
          ...(attribute && !attributes[attribute]
            ? [{ value: attribute, label: attribute }]
            : []),
        ]}
        checkboxes={[
          <Input
            key="visibility"
            checked={
              (entity.visibility || {})[`attr.${key}`] === undefined
                ? false
                : !(entity.visibility || {})[`attr.${key}`]
            }
            onChange={({ target }) =>
              updateEntityInEdit({
                visibility: { [`attr.${key}`]: !target.checked },
              })
            }
            type="checkbox"
          />,
        ]}
      />
    );

    let attributes = null;
    if (isAttributesOpen) {
      attributes = (
        <FlexContainer
          direction="column"
          className="EntityAttributes-Attributes"
        >
          {nameAttribute}
          {(Entities[entityType].attributes || []).map(attribute =>
            (isSidebarEditActive ? renderAttributeEdit : renderAttribute)(
              attribute,
              (entity.attributes || {})[attribute.key],
              (entity.visibility || {})[`attr.${attribute.key}`],
            ),
          )}
          {hiddenAttribute}
          {descriptionAttribute}
        </FlexContainer>
      );
    }

    const renderSubHeader = () => {
      if (!isSidebarEditActive || !isAttributesOpen) {
        return null;
      }
      return (
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
    };

    attributesSection = (
      <div key="attributes">
        <SectionHeader isOpen={isAttributesOpen} onClick={toggleAttributesOpen}>
          <span className="EntityAttributes-Name">
            <FormattedMessage id="misc.attributes" />
          </span>
        </SectionHeader>
        {renderSubHeader()}
        {attributes}
      </div>
    );
  }

  return (
    <Fragment>
      {attributesSection}
      <EntityTags
        key="tags"
        isSidebarEditActive={isSidebarEditActive}
        entity={entity}
        entityType={entityType}
        updateEntityInEdit={updateEntityInEdit}
        isOpen={isTagsOpen}
        toggleOpen={toggleTagsOpen}
        intl={intl}
        isShared={isShared}
      />
      <ReactHint events position="left" />
    </Fragment>
  );
}

EntityAttributes.propTypes = {
  isSidebarEditActive: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    attributes: PropTypes.shape(),
    visibility: PropTypes.shape(),
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
  isAttributesOpen: PropTypes.bool.isRequired,
  isTagsOpen: PropTypes.bool.isRequired,
  toggleAttributesOpen: PropTypes.func.isRequired,
  toggleTagsOpen: PropTypes.func.isRequired,
  isAncestorHidden: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  isShared: PropTypes.bool.isRequired,
};
