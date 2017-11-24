import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

import SectionHeader from 'primitives/text/section-header';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

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

const renderAttribute = ({ key, name, attributes }, attribute) => {
  if ((!attributes && !attribute) || (attributes && !attributes[attribute])) {
    return null;
  }
  return (
    <p key={key} className="EntityAttributes-Attribute">
      <b>{name}:</b> {attributes[attribute].name}
    </p>
  );
};

export default function EntityAttributes({ attributes, entityType }) {
  if (!attributes || !Object.keys(attributes).length) {
    return null;
  }

  let attributesSection = null;
  if (
    Entities[entityType].attributes &&
    Object.keys(omit({ ...attributes }, 'tags')).length
  ) {
    attributesSection = (
      <FlexContainer direction="column">
        <SectionHeader>Attributes</SectionHeader>
        {Entities[entityType].attributes.map(attribute =>
          renderAttribute(attribute, attributes[attribute.key]),
        )}
      </FlexContainer>
    );
  }

  let tagsSection = null;
  if (Entities[entityType].tags && attributes.tags && attributes.tags.length) {
    tagsSection = (
      <FlexContainer direction="column">
        <SectionHeader>{Entities[entityType].name} Tags</SectionHeader>
        <div className="EntityAttributes-Section">
          {renderTags(Entities[entityType].tags, attributes.tags)}
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
  attributes: PropTypes.shape(),
  entityType: PropTypes.string.isRequired,
};

EntityAttributes.defaultProps = {
  attributes: null,
};
