import React from 'react';
import PropTypes from 'prop-types';

import HexMap from 'components/hex-map';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';

import { stringSortByKey, toCommaArray } from 'utils/common';
import WorldTags from 'constants/world-tags';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';

import './style.css';

const renderAttribute = (title, attribute, obj) =>
  (!obj && !attribute) || (obj && !obj[attribute]) ? null : (
    <p className="PrintableSector-PlanetAttribute">
      <b>{title}:</b> {obj ? obj[attribute].name : attribute}
    </p>
  );

const renderPlanets = planets =>
  Object.keys(planets)
    .map(key => planets[key])
    .sort(stringSortByKey('name'))
    .map(planet => (
      <div key={planet.name}>
        <FlexContainer
          key={planet.name}
          direction="column"
          align="flexStart"
          className="PrintableSector-Planet"
        >
          <Header
            dark
            type={HeaderType.header3}
            className="PrintableSector-SystemTitle"
          >
            {planet.name}
          </Header>
          {renderAttribute('Tech Level', planet.techLevel)}
          {renderAttribute('Atmosphere', planet.atmosphere, Atmosphere)}
          {renderAttribute('Temperature', planet.temperature, Temperature)}
          {renderAttribute('Biosphere', planet.biosphere, Biosphere)}
          {renderAttribute('Population', planet.population, Population)}
          {renderAttribute(
            'Tags',
            planet.tags
              .map(tag => WorldTags[tag].name)
              .map(toCommaArray)
              .join(''),
          )}
        </FlexContainer>
      </div>
    ));

const renderSystem = system => (
  <div key={system.key} className="PrintableSector-System">
    <FlexContainer
      align="baseline"
      justify="center"
      className="PrintableSector-SystemHeader"
    >
      <Header
        dark
        type={HeaderType.header2}
        className="PrintableSector-SystemTitle"
      >
        {system.name}
      </Header>
      <Header
        type={HeaderType.header4}
        className="PrintableSector-SystemKey PrintableSector-SystemTitle"
      >
        ({system.key})
      </Header>
    </FlexContainer>
    {renderPlanets(system.planets)}
  </div>
);

const renderSystems = systems =>
  Object.keys(systems)
    .map(key => systems[key])
    .sort(stringSortByKey('name'))
    .map((system, i, arr) => (i % 3 === 0 ? arr.slice(i, i + 3) : null))
    .filter(system => system)
    .map(systemGroup => (
      <FlexContainer
        key={systemGroup
          .map(system => system.name)
          .map(toCommaArray)
          .join('')}
        className="PrintableSector-Systems"
      >
        {systemGroup.map(renderSystem)}
      </FlexContainer>
    ));

export default function PrintableSector({ printable, systems }) {
  return (
    <div className="PrintableSector">
      <div className="PrintableSector-Container">
        <HexMap hexes={printable.hexes} viewbox={printable.viewbox} />
      </div>
      <div className="PrintableSector-SystemsContainer">
        {renderSystems(systems)}
      </div>
    </div>
  );
}

PrintableSector.propTypes = {
  systems: PropTypes.shape().isRequired,
  printable: PropTypes.shape({
    hexes: PropTypes.arrayOf(PropTypes.object).isRequired,
    viewbox: PropTypes.string.isRequired,
  }).isRequired,
};
