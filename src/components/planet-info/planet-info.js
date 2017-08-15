import React from 'react';
import PropTypes from 'prop-types';

import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SectionHeader from 'primitives/text/section-header';
import Header, { HeaderType } from 'primitives/text/header';
import { capitalizeFirstLetter } from 'utils/common';
import WorldTags from 'constants/world-tags';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';

import './style.css';

const renderList = (title, list) =>
  <div className="PlanetInfo-Content">
    <b>
      {title}:
    </b>
    <ul className="PlanetInfo-ContentList">
      {list.map(capitalizeFirstLetter).map(element =>
        <li key={element}>
          {element}
        </li>,
      )}
    </ul>
  </div>;

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
      }) =>
        <div key={key} className="PlanetInfo-Tag">
          <Header type={HeaderType.header4}>
            {name}
          </Header>
          <p className="PlanetInfo-Content">
            {description}
          </p>
          {renderList('Enemies', enemies)}
          {renderList('Friends', friends)}
          {renderList('Complications', complications)}
          {renderList('Things', things)}
          {renderList('Places', places)}
        </div>,
    );

const renderAttribute = (title, attribute, obj) =>
  <p className="PlanetInfo-Attribute">
    <b>{title}:</b> {obj ? (obj[attribute] || {}).name : attribute}
  </p>;

export default function SectorInfo({ planet, location, routeParams }) {
  return (
    <SidebarNavigation
      name={planet.name}
      back={`/sector/system/${routeParams.system}${location.search}`}
      type={SidebarType.planet}
    >
      <SectionHeader>Attributes</SectionHeader>
      {renderAttribute('Tech Level', planet.techLevel)}
      {renderAttribute('Atmosphere', planet.atmosphere, Atmosphere)}
      {renderAttribute('Temperature', planet.temperature, Temperature)}
      {renderAttribute('Biosphere', planet.biosphere, Biosphere)}
      {renderAttribute('Population', planet.population, Population)}
      <SectionHeader>World Tags</SectionHeader>
      <div className="PlanetInfo-Section">
        {renderTags(planet.tags)}
      </div>
    </SidebarNavigation>
  );
}

SectorInfo.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    techLevel: PropTypes.string.isRequired,
    atmosphere: PropTypes.string.isRequired,
    temperature: PropTypes.string.isRequired,
    biosphere: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  routeParams: PropTypes.shape({
    system: PropTypes.string.isRequired,
    planet: PropTypes.string.isRequired,
  }).isRequired,
};
