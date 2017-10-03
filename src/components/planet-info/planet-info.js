import React from 'react';
import PropTypes from 'prop-types';
import { RefreshCw } from 'react-feather';
import Chance from 'chance';
import { map } from 'lodash';

import SidebarInfo from 'components/sidebar-info';
import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';

import FlexContainer from 'primitives/containers/flex-container';
import SectionHeader from 'primitives/text/section-header';
import Header, { HeaderType } from 'primitives/text/header';
import Modal from 'primitives/other/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Dropdown from 'primitives/form/dropdown';

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
    editPlanet: PropTypes.func.isRequired,
  };

  static defaultProps = {
    planet: {},
  };

  constructor(props) {
    super(props);

    this.onRandomizeName = this.onRandomizeName.bind(this);
    this.onSavePlanet = this.onSavePlanet.bind(this);
    this.state = {
      ...props.planet,
      isNotUnique: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.name !== nextProps.planet.name) {
      this.setState({
        ...nextProps.planet,
      });
    }
  }

  onSavePlanet() {
    const nameKey = encodeURIComponent(this.state.name.toLowerCase());
    if (
      this.props.planetKeys.indexOf(nameKey) >= 0 &&
      this.props.planet.key !== nameKey
    ) {
      this.setState({
        isNotUnique: true,
      });
    } else {
      this.props.editPlanet(
        this.props.routeParams.system,
        encodeURIComponent(this.props.routeParams.planet),
        {
          name: this.state.name,
          techLevel: this.state.techLevel,
          atmosphere: this.state.atmosphere,
          temperature: this.state.temperature,
          biosphere: this.state.biosphere,
          population: this.state.population,
          tags: this.state.tags.map(({ value }) => value),
        },
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

  renderEditableDropdown(dropdownName, stateKey, constants, noPadding, dropUp) {
    return (
      <FlexContainer direction="column" className="PlanetInfo-Editable">
        <Label noPadding={noPadding} htmlFor={stateKey}>
          {dropdownName}
        </Label>
        <Dropdown
          id={stateKey}
          name={stateKey}
          value={this.state[stateKey]}
          clearable={false}
          onChange={this.onEditDropdown(stateKey, { isNotUnique: false })}
          dropUp={dropUp}
          options={
            Array.isArray(constants) ? (
              constants
            ) : (
              map(constants, ({ name }, key) => ({
                value: key,
                label: name,
              }))
            )
          }
        />
      </FlexContainer>
    );
  }

  renderEditModal() {
    let errorText = null;
    if (this.state.isNotUnique) {
      errorText = (
        <div className="SidebarInfo-Error">
          Name must be unique in the sector.
        </div>
      );
    }

    return (
      <Modal
        isOpen={this.state.isOpen}
        onCancel={this.onClose}
        title="Edit Planet"
        doubleSize
        actionButtons={[
          <Button primary key="save" onClick={this.onSavePlanet}>
            Save Planet
          </Button>,
        ]}
      >
        <FlexContainer wrap justify="spaceBetween">
          <FlexContainer direction="column" className="PlanetInfo-Editable">
            <Label noPadding htmlFor="name">
              Planet Name
            </Label>
            <IconInput
              id="name"
              name="name"
              data-key="name"
              error={this.state.isNotUnique}
              icon={RefreshCw}
              value={this.state.name}
              onChange={this.onEditText({ isNotUnique: false })}
              onIconClick={this.onRandomizeName}
            />
            {errorText}
          </FlexContainer>
          {this.renderEditableDropdown(
            'Tech Level',
            'techLevel',
            [
              { value: 'TL0', label: 'TL0' },
              { value: 'TL1', label: 'TL1' },
              { value: 'TL2', label: 'TL2' },
              { value: 'TL3', label: 'TL3' },
              { value: 'TL4', label: 'TL4' },
              { value: 'TL4+', label: 'TL4+' },
              { value: 'TL5', label: 'TL5' },
            ],
            true,
          )}
          {this.renderEditableDropdown('Atmosphere', 'atmosphere', Atmosphere)}
          {this.renderEditableDropdown(
            'Temperature',
            'temperature',
            Temperature,
          )}
          {this.renderEditableDropdown(
            'Biosphere',
            'biosphere',
            Biosphere,
            false,
            true,
          )}
          {this.renderEditableDropdown(
            'Population',
            'population',
            Population,
            false,
            true,
          )}
          <FlexContainer direction="column" className="PlanetInfo-EditableTags">
            <Label htmlFor="tags">World Tags</Label>
            <Dropdown
              id="tags"
              name="tags"
              value={this.state.tags}
              multi
              dropUp
              onChange={this.onEditDropdown('tags', { isNotUnique: false })}
              options={map(WorldTags, ({ name }, key) => ({
                value: key,
                label: name,
              }))}
            />
          </FlexContainer>
        </FlexContainer>
      </Modal>
    );
  }

  render() {
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
        {this.renderEditModal()}
      </SidebarNavigation>
    );
  }
}
