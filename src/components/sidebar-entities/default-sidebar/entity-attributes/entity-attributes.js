import React from 'react';
import PropTypes from 'prop-types';
import { omit, map, values } from 'lodash';
import { RefreshCw } from 'react-feather';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import Dropdown from 'primitives/form/dropdown';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';

import Entities from 'constants/entities';

import EntityTags from './entity-tags';
import './style.css';

// eslint-disable-next-line react/prop-types
const renderAttribute = ({ key, name, attributes }, attribute) => {
  if (!attributes || !attribute) {
    return null;
  }

  return (
    <FlexContainer key={key} className="EntityAttributes-Attribute">
      <b className="EntityAttributes-Header">
        <FormattedMessage id={name} />:
      </b>
      <span className="EntityAttributes-Item">
        {attributes[attribute] ? (
          <FormattedMessage id={attributes[attribute].name} />
        ) : (
          attribute
        )}
      </span>
    </FlexContainer>
  );
};

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
}) {
  const noAttributes =
    !entity.attributes || !Object.keys(entity.attributes).length;
  if (!isSidebarEditActive && noAttributes) {
    return null;
  }

  let attributesSection = null;
  const hasNonTagAttributes = values(
    omit({ ...entity.attributes }, 'tags'),
  ).filter(v => v).length;

  if (isSidebarEditActive || hasNonTagAttributes) {
    let nameAttribute = null;
    let hiddenAttribute = null;
    let descriptionAttribute = null;
    if (isSidebarEditActive) {
      nameAttribute = (
        <FlexContainer align="center" className="EntityAttributes-Attribute">
          <b className="EntityAttributes-Header">
            <FormattedMessage id="misc.name" />:
          </b>
          <IconInput
            wrapperClassName="EntityAttributes-Item"
            value={entity.name}
            onChange={({ target }) =>
              updateEntityInEdit({ name: target.value })
            }
            onIconClick={() =>
              updateEntityInEdit({ name: Entities[entityType].nameGenerator() })
            }
            icon={RefreshCw}
          />
        </FlexContainer>
      );
      descriptionAttribute = (
        <FlexContainer align="center" className="EntityAttributes-Attribute">
          <Input
            rows="5"
            type="textarea"
            placeholder="Description"
            value={(entity.attributes || {}).description || ''}
            onChange={({ target } = {}) =>
              updateEntityInEdit({ attributes: { description: target.value } })
            }
          />
        </FlexContainer>
      );
      if (entityType !== Entities.sector.key) {
        hiddenAttribute = (
          <FlexContainer align="center" className="EntityAttributes-Attribute">
            <b className="EntityAttributes-Header">
              <FormattedMessage id="misc.isHidden" />:
            </b>
            <Input
              className="EntityAttributes-Item"
              type="checkbox"
              checked={!!entity.isHidden || isAncestorHidden}
              disabled={isAncestorHidden}
              onChange={({ target } = {}) =>
                updateEntityInEdit({ isHidden: target.checked })
              }
            />
          </FlexContainer>
        );
      }
    } else if ((entity.attributes || {}).description) {
      descriptionAttribute = (
        <FlexContainer
          direction="column"
          className="EntityAttributes-Attribute"
        >
          <b className="EntityAttributes-Header">
            <FormattedMessage id="misc.description" />:
          </b>
          <span className="EntityAttributes-Item EntityAttributes-Item--multiline">
            {(entity.attributes || {}).description}
          </span>
        </FlexContainer>
      );
    }

    // eslint-disable-next-line react/prop-types
    const renderAttributeEdit = ({ key, name, attributes }, attribute) => (
      <FlexContainer
        key={key}
        align="center"
        className="EntityAttributes-Attribute"
      >
        <b className="EntityAttributes-Header">
          <FormattedMessage id={name} />:
        </b>
        <Dropdown
          allowCreate
          wrapperClassName="EntityAttributes-Item"
          value={attribute}
          onChange={item =>
            updateEntityInEdit({ attributes: { [key]: (item || {}).value } })
          }
          options={[
            ...map(attributes, attr => ({
              value: attr.key,
              label: intl.formatMessage({ id: attr.name }),
            })),
            ...(!attributes[attribute]
              ? [{ value: attribute, label: attribute }]
              : []),
          ]}
        />
      </FlexContainer>
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
            ),
          )}
          {hiddenAttribute}
          {descriptionAttribute}
        </FlexContainer>
      );
    }

    attributesSection = (
      <div key="attributes">
        <SectionHeader isOpen={isAttributesOpen} onClick={toggleAttributesOpen}>
          <span className="EntityAttributes-Name">
            <FormattedMessage id="misc.attributes" />
          </span>
        </SectionHeader>
        {attributes}
      </div>
    );
  }

  return [
    attributesSection,
    <EntityTags
      key="tags"
      isSidebarEditActive={isSidebarEditActive}
      entity={entity}
      entityType={entityType}
      updateEntityInEdit={updateEntityInEdit}
      isOpen={isTagsOpen}
      toggleOpen={toggleTagsOpen}
      intl={intl}
    />,
  ];
}

EntityAttributes.propTypes = {
  isSidebarEditActive: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    attributes: PropTypes.shape(),
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
  isAttributesOpen: PropTypes.bool.isRequired,
  isTagsOpen: PropTypes.bool.isRequired,
  toggleAttributesOpen: PropTypes.func.isRequired,
  toggleTagsOpen: PropTypes.func.isRequired,
  isAncestorHidden: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

EntityAttributes.defaultProps = {
  attributes: null,
};
