import React from 'react';
import PropTypes from 'prop-types';

import SidebarInfo from 'components/sidebar-info';
import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import PlanetEditModal from 'components/planet-edit-modal';

import SectionHeader from 'primitives/text/section-header';
import Header, { HeaderType } from 'primitives/text/header';

import { capitalizeFirstLetter } from 'utils/common';
import WorldTags from 'constants/world-tags';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';

import './style.css';

const renderList = (title, list) => (
  <div className="PlanetInfo-Content">
    <b>{title}:</b>
    <ul className="PlanetInfo-ContentList">
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
        <div key={key} className="PlanetInfo-Tag">
          <Header type={HeaderType.header4}>{name}</Header>
          <p className="PlanetInfo-Content">{description}</p>
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
    <p className="PlanetInfo-Attribute">
      <b>{title}:</b> {obj ? obj[attribute].name : attribute}
    </p>
  );

export default class PlanetInfo extends SidebarInfo {
  static propTypes = {
    planet: PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      techLevel: PropTypes.string,
      atmosphere: PropTypes.string,
      temperature: PropTypes.string,
      biosphere: PropTypes.string,
      population: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
    router: PropTypes.shape({
      params: PropTypes.shape({
        sector: PropTypes.string.isRequired,
        system: PropTypes.string.isRequired,
        planet: PropTypes.string.isRequired,
      }),
    }).isRequired,
    editPlanet: PropTypes.func.isRequired,
    deletePlanet: PropTypes.func.isRequired,
  };

  static defaultProps = {
    planet: {},
  };

  state = {
    isOpen: false,
    isConfirmDeleteOpen: false,
  };

  onSavePlanet = planet => {
    this.props.editPlanet(
      this.props.router.params.system,
      encodeURIComponent(this.props.router.params.planet),
      planet,
    );
    this.onClose();
  };

  onDeletePlanet = (system, planet) => () => {
    this.onCancelDelete();
    this.props.deletePlanet(system, planet);
  };

  render() {
    return (
      <SidebarNavigation
        name={this.props.planet.name || ''}
        back={`/sector/${this.props.router.params.sector}/system/${this.props
          .router.params.system}`}
        type={SidebarType.planet}
        onEdit={this.onEdit}
        onDelete={this.onConfirmDelete}
      >
        <SectionHeader>Attributes</SectionHeader>
        {renderAttribute('Tech Level', this.props.planet.techLevel)}
        {renderAttribute(
          'Atmosphere',
          this.props.planet.atmosphere,
          Atmosphere,
        )}
        {renderAttribute(
          'Temperature',
          this.props.planet.temperature,
          Temperature,
        )}
        {renderAttribute('Biosphere', this.props.planet.biosphere, Biosphere)}
        {renderAttribute(
          'Population',
          this.props.planet.population,
          Population,
        )}
        <SectionHeader>World Tags</SectionHeader>
        <div className="PlanetInfo-Section">
          {renderTags(this.props.planet.tags)}
        </div>
        <PlanetEditModal
          systemKey={this.props.router.params.system}
          planetKey={this.props.router.params.planet}
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          onSubmit={this.onSavePlanet}
        />
        {this.renderConfirmModal(
          this.onDeletePlanet(
            this.props.router.params.system,
            this.props.planet.key,
          ),
          'planet',
        )}
      </SidebarNavigation>
    );
  }
}
