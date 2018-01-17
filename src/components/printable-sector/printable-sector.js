import React from 'react';
import PropTypes from 'prop-types';
import { pickBy, map } from 'lodash';

import HexMap from 'components/hex-map';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';

import { sortByKey, toCommaArray, coordinateKey } from 'utils/common';
import WorldTags from 'constants/world-tags';
import TechLevel from 'constants/tech-level';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';

import './style.css';

const renderAttribute = (title, attribute, obj) =>
  (!obj && !attribute) || (obj && !obj.attributes[attribute]) ? null : (
    <p className="PrintableSector-PlanetAttribute">
      <b>{title}:</b> {obj ? obj.attributes[attribute].name : attribute}
    </p>
  );

const renderPlanets = planets =>
  map(planets, (planet, key) => ({ ...planet, key }))
    .sort(sortByKey('name'))
    .map(({ key, name, attributes = {} }) => (
      <div key={key}>
        <FlexContainer
          key={name}
          direction="column"
          align="flexStart"
          className="PrintableSector-Planet"
        >
          <Header
            dark
            type={HeaderType.header3}
            className="PrintableSector-SystemTitle"
          >
            {name}
          </Header>
          {renderAttribute('Tech Level', attributes.techLevel, TechLevel)}
          {renderAttribute('Atmosphere', attributes.atmosphere, Atmosphere)}
          {renderAttribute('Temperature', attributes.temperature, Temperature)}
          {renderAttribute('Biosphere', attributes.biosphere, Biosphere)}
          {renderAttribute('Population', attributes.population, Population)}
          {renderAttribute(
            'Tags',
            (attributes.tags || [])
              .map(tag => WorldTags[tag].name)
              .map(toCommaArray)
              .join(''),
          )}
        </FlexContainer>
      </div>
    ));

const renderSystem = (system, planets) => (
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
        ({coordinateKey(system.x, system.y)})
      </Header>
    </FlexContainer>
    {renderPlanets(pickBy(planets, ({ parent }) => parent === system.key))}
  </div>
);

const renderSystems = (systems, planets) =>
  map(systems, (system, key) => ({ ...system, key }))
    .sort(sortByKey('name'))
    .map((system, i, arr) => (i % 3 === 0 ? arr.slice(i, i + 3) : null))
    .filter(system => system)
    .map(systemGroup => (
      <FlexContainer
        key={systemGroup
          .map(system => system.key)
          .map(toCommaArray)
          .join('')}
        className="PrintableSector-Systems"
      >
        {systemGroup.map(system => renderSystem(system, planets))}
      </FlexContainer>
    ));

export default function PrintableSector({ printable, systems, planets }) {
  return (
    <div className="PrintableSector">
      <div className="PrintableSector-Container">
        <HexMap hexes={printable.hexes} viewbox={printable.viewbox} />
      </div>
      <div className="PrintableSector-SystemsContainer">
        {renderSystems(systems, planets)}
      </div>
    </div>
  );
}

PrintableSector.propTypes = {
  systems: PropTypes.shape().isRequired,
  planets: PropTypes.shape().isRequired,
  printable: PropTypes.shape({
    hexes: PropTypes.arrayOf(PropTypes.object).isRequired,
    viewbox: PropTypes.string.isRequired,
  }).isRequired,
};
