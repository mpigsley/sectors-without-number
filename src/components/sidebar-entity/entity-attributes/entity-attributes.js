import React from 'react';
import PropTypes from 'prop-types';
import { omit, map } from 'lodash';
import { RefreshCw } from 'react-feather';

import SectionHeader from 'primitives/text/section-header';
import Dropdown from 'primitives/form/dropdown';
import IconInput from 'primitives/form/icon-input';

import Entities from 'constants/entities';

import EntityTags from './entity-tags';
import './style.css';

// eslint-disable-next-line react/prop-types
const renderAttribute = ({ key, name, attributes }, attribute) => {
  if ((!attributes && !attribute) || (attributes && !attributes[attribute])) {
    return null;
  }

  return (
    <p key={key} className="EntityAttributes-Attribute">
      <b className="EntityAttributes-Header">{name}:</b>
      <span className="EntityAttributes-Item">
        {attributes[attribute].name}
      </span>
    </p>
  );
};

// eslint-disable-next-line react/prop-types
const renderAttributeEdit = ({ key, name, attributes }, attribute) => (
  <div key={key} className="EntityAttributes-Attribute">
    <b className="EntityAttributes-Header">{name}:</b>
    <Dropdown
      wrapperClassName="EntityAttributes-Item"
      value={attribute}
      options={map(attributes, attr => ({
        value: attr.key,
        label: attr.name,
      }))}
    />
  </div>
);

export default function EntityAttributes({
  isSidebarEditActive,
  entity,
  entityType,
}) {
  const noAttributes =
    !entity.attributes || !Object.keys(entity.attributes).length;
  if (!isSidebarEditActive && noAttributes) {
    return null;
  }

  let attributesSection = null;
  const hasNonTagAttributes =
    Entities[entityType].attributes &&
    Object.keys(omit({ ...entity.attributes }, 'tags')).length;

  if (isSidebarEditActive || hasNonTagAttributes) {
    let nameAttribute = null;
    if (isSidebarEditActive) {
      nameAttribute = (
        <div className="EntityAttributes-Attribute">
          <b className="EntityAttributes-Header">Name:</b>
          <IconInput
            className="EntityAttributes-Item"
            value={entity.name}
            icon={RefreshCw}
          />
        </div>
      );
    }

    attributesSection = (
      <div key="attributes">
        <SectionHeader>Attributes</SectionHeader>
        <div className="EntityAttributes-Attributes">
          {nameAttribute}
          {(Entities[entityType].attributes || []).map(attribute =>
            (isSidebarEditActive ? renderAttributeEdit : renderAttribute)(
              attribute,
              entity.attributes[attribute.key],
            ),
          )}
        </div>
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
    />,
  ];
}

EntityAttributes.propTypes = {
  isSidebarEditActive: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    attributes: PropTypes.shape(),
  }).isRequired,
  entityType: PropTypes.string.isRequired,
};

EntityAttributes.defaultProps = {
  attributes: null,
};
