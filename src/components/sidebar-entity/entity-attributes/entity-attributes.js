import React from 'react';
import PropTypes from 'prop-types';
import { omit, map } from 'lodash';
import { RefreshCw } from 'react-feather';

import SectionHeader from 'primitives/text/section-header';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Dropdown from 'primitives/form/dropdown';
import IconInput from 'primitives/form/icon-input';

import { capitalizeFirstLetter } from 'utils/common';
import Entities from 'constants/entities';

import './style.css';

const renderList = (title, list) => (
  <div className="EntityAttributes-Content">
    <b>{title}:</b>
    <ul className="EntityAttributes-ContentList">
      {list
        .map(capitalizeFirstLetter)
        .map(element => <li key={element}>{element}</li>)}
    </ul>
  </div>
);

const renderTags = (definitions, tags = []) =>
  tags
    .map(tag => definitions[tag])
    .map(
      ({
        key,
        name,
        description,
        enemies,
        friends,
        complications,
        things,
        places,
      }) => (
        <div key={key} className="EntityAttributes-Tag">
          <Header type={HeaderType.header4}>{name}</Header>
          <p className="EntityAttributes-Content">{description}</p>
          {renderList('Enemies', enemies)}
          {renderList('Friends', friends)}
          {renderList('Complications', complications)}
          {renderList('Things', things)}
          {renderList('Places', places)}
        </div>
      ),
    );

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
      <FlexContainer direction="column">
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
      </FlexContainer>
    );
  }

  let tagsSection = null;
  if (
    Entities[entityType].tags &&
    entity.attributes.tags &&
    entity.attributes.tags.length
  ) {
    tagsSection = (
      <FlexContainer direction="column">
        <SectionHeader>{Entities[entityType].name} Tags</SectionHeader>
        <div className="EntityAttributes-Section">
          {renderTags(Entities[entityType].tags, entity.attributes.tags)}
        </div>
      </FlexContainer>
    );
  }
  return (
    <div>
      {attributesSection}
      {tagsSection}
    </div>
  );
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
