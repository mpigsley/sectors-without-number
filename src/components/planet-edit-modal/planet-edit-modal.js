import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw } from 'react-feather';
import Chance from 'chance';
import { map, isEqual, includes, pull } from 'lodash';

import FlexContainer from 'primitives/container/flex-container';
import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Dropdown from 'primitives/form/dropdown';

import { generateName } from 'utils/name-generator';
import WorldTags from 'constants/world-tags';
import TechLevel from 'constants/tech-level';
import Atmosphere from 'constants/atmosphere';
import Temperature from 'constants/temperature';
import Biosphere from 'constants/biosphere';
import Population from 'constants/population';

import './style.css';

const planetStateFromProps = (
  {
    name,
    techLevel,
    atmosphere,
    temperature,
    biosphere,
    population,
    tags,
  } = {},
) => ({
  name: name || generateName(new Chance()),
  techLevel: {
    value: techLevel,
    label: (TechLevel[techLevel] || {}).name,
  },
  atmosphere: {
    value: atmosphere,
    label: (Atmosphere[atmosphere] || {}).name,
  },
  temperature: {
    value: temperature,
    label: (Temperature[temperature] || {}).name,
  },
  biosphere: {
    value: biosphere,
    label: (Biosphere[biosphere] || {}).name,
  },
  population: {
    value: population,
    label: (Population[population] || {}).name,
  },
  tags: (tags || []).map(tag => ({
    value: tag,
    label: (WorldTags[tag] || {}).name,
  })),
});

export default class PlanetInfo extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    planetKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  };

  static defaultProps = {
    planet: undefined,
  };

  state = {
    ...planetStateFromProps(this.props.planet),
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.planet, this.props.planet)) {
      this.setState({
        ...planetStateFromProps(nextProps.planet),
      });
    }
  }

  onNewPlanetName = () => {
    this.setState({ name: generateName(new Chance()) });
  };

  onEditPlanet = ({ target }) => {
    this.setState({ [target.dataset.key]: target.value });
  };

  onSubmit = () => {
    this.props.onSubmit({
      name: this.state.name,
      key: encodeURIComponent(this.state.name.toLowerCase()),
      techLevel: (this.state.techLevel || {}).value || '',
      atmosphere: (this.state.atmosphere || {}).value || '',
      temperature: (this.state.temperature || {}).value || '',
      biosphere: (this.state.biosphere || {}).value || '',
      population: (this.state.population || {}).value || '',
      tags: this.state.tags.map(({ value }) => value),
    });
  };

  get areAllUnique() {
    const existingName = encodeURIComponent(
      ((this.props.planet || {}).name || '').toLowerCase(),
    );
    return (
      this.state.name &&
      !includes(
        { ...pull([...this.props.planetKeys], existingName) },
        encodeURIComponent(this.state.name.toLowerCase()),
      )
    );
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
          value={
            (this.state[stateKey] || {}).value
              ? this.state[stateKey]
              : undefined
          }
          onChange={changed => this.setState({ [stateKey]: changed })}
          dropUp={dropUp}
          options={
            Array.isArray(constants)
              ? constants
              : map(constants, ({ name }, key) => ({
                  value: key,
                  label: name,
                }))
          }
        />
      </FlexContainer>
    );
  }

  renderUniqueError = () => {
    if (this.areAllUnique) {
      return null;
    }
    return (
      <div className="PlanetEditModal-Error">
        All planet names must be unique throughout the sector.
      </div>
    );
  };

  render() {
    const action = this.props.planet ? 'Edit' : 'Create';

    return (
      <Modal
        isOpen={this.props.isOpen}
        onCancel={this.props.onClose}
        title={`${action} Planet`}
        doubleSize
        actionButtons={[
          <Button
            primary
            key="save"
            onClick={this.onSubmit}
            disabled={!this.areAllUnique}
          >
            {action}
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
              error={!this.areAllUnique}
              icon={RefreshCw}
              value={this.state.name}
              onChange={this.onEditPlanet}
              onIconClick={this.onNewPlanetName}
            />
            {this.renderUniqueError()}
          </FlexContainer>
          {this.renderEditableDropdown(
            'Tech Level',
            'techLevel',
            TechLevel,
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
              onChange={changed => this.setState({ tags: changed })}
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
}
