import React from 'react';
import PropTypes from 'prop-types';
import { RefreshCw } from 'react-feather';
import Chance from 'chance';

import SidebarInfo from 'components/sidebar-info';
import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';

import SectionHeader from 'primitives/text/section-header';
import Header, { HeaderType } from 'primitives/text/header';
import Modal from 'primitives/other/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';

import { capitalizeFirstLetter } from 'utils/common';
import { generateName } from 'utils/name-generator';
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

const renderAttribute = (title, attribute, obj) => (
  <p className="PlanetInfo-Attribute">
    <b>{title}:</b> {obj ? (obj[attribute] || {}).name : attribute}
  </p>
);

export default class PlanetInfo extends SidebarInfo {
  static propTypes = {
    planet: PropTypes.shape({
      name: PropTypes.string,
      techLevel: PropTypes.string,
      atmosphere: PropTypes.string,
      temperature: PropTypes.string,
      biosphere: PropTypes.string,
      population: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
    planetKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }).isRequired,
    routeParams: PropTypes.shape({
      system: PropTypes.string.isRequired,
      planet: PropTypes.string.isRequired,
    }).isRequired,
    editPlanetName: PropTypes.func.isRequired,
  };

  static defaultProps = {
    planet: {},
  };

  constructor(props) {
    super(props);

    this.onRandomizeName = this.onRandomizeName.bind(this);
    this.onEditName = this.onEditName.bind(this);
    this.onSavePlanet = this.onSavePlanet.bind(this);
    this.state = {
      name: this.props.planet.name,
      isNotUnique: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.name && nextProps.planet.name) {
      this.setState({
        name: nextProps.planet.name,
      });
    }
  }

  onSavePlanet() {
    const nameKey = encodeURIComponent(this.state.name.toLowerCase());
    if (this.props.planetKeys.indexOf(nameKey) >= 0) {
      this.setState({
        isNotUnique: true,
      });
    } else {
      this.props.editPlanetName(
        this.props.routeParams.system,
        encodeURIComponent(this.props.routeParams.planet),
        this.state.name,
      );
      this.onClose();
    }
  }

  onRandomizeName() {
    const chance = new Chance();
    this.setState({
      name: generateName(chance),
      isNotUnique: false,
    });
  }

  onEditName(e) {
    this.setState({
      name: e.target.value,
      isNotUnique: false,
    });
  }

  render() {
    let errorText = null;
    if (this.state.isNotUnique) {
      errorText = (
        <div className="PlanetInfo-Error">
          Name must be unique in the sector.
        </div>
      );
    }

    return (
      <SidebarNavigation
        name={this.props.planet.name || ''}
        back={`/sector/system/${this.props.routeParams.system}${this.props
          .location.search}`}
        type={SidebarType.planet}
        onEdit={this.onEdit}
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
        <Modal
          isOpen={this.state.isOpen}
          onCancel={this.onClose}
          title="Edit Planet"
          actionButtons={[
            <Button primary key="save" onClick={this.onSavePlanet}>
              Save Planet
            </Button>,
          ]}
        >
          <Label noPadding htmlFor="name">
            Planet Name
          </Label>
          <IconInput
            id="name"
            error={this.state.isNotUnique}
            icon={RefreshCw}
            value={this.state.name}
            onChange={this.onEditName}
            onIconClick={this.onRandomizeName}
          />
          {errorText}
        </Modal>
      </SidebarNavigation>
    );
  }
}
