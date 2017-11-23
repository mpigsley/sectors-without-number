import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from 'primitives/text/section-header';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import { capitalizeFirstLetter } from 'utils/common';
import WorldTags from 'constants/world-tags';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';

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

const renderTags = (tags = []) =>
  tags
    .map(tag => WorldTags[tag])
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

const renderAttribute = (title, attribute, obj) =>
  (!obj && !attribute) || (obj && !obj[attribute]) ? null : (
    <p className="EntityAttributes-Attribute">
      <b>{title}:</b> {obj ? obj[attribute].name : attribute}
    </p>
  );

export default function EntityAttributes({ attributes }) {
  if (!attributes) {
    return null;
  }
  return (
    <FlexContainer direction="column">
      <SectionHeader>Attributes</SectionHeader>
      {renderAttribute('Tech Level', attributes.techLevel)}
      {renderAttribute('Atmosphere', attributes.atmosphere, Atmosphere)}
      {renderAttribute('Temperature', attributes.temperature, Temperature)}
      {renderAttribute('Biosphere', attributes.biosphere, Biosphere)}
      {renderAttribute('Population', attributes.population, Population)}
      <SectionHeader>World Tags</SectionHeader>
      <div className="EntityAttributes-Section">
        {renderTags(attributes.tags)}
      </div>
    </FlexContainer>
  );
}

EntityAttributes.propTypes = {
  attributes: PropTypes.shape(),
};

EntityAttributes.defaultProps = {
  attributes: null,
};
