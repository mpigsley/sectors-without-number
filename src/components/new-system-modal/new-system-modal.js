/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw, X, Plus } from 'react-feather';
import Chance from 'chance';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Checkbox from 'primitives/form/checkbox';
import FlexContainer from 'primitives/container/flex-container';

import { generateName } from 'utils/name-generator';
import { System } from 'utils/sector-generator';

import './style.css';

const generatePlanetNames = () =>
  Array.from([...Array(new Chance().weighted([1, 2, 3], [5, 3, 2]))], () =>
    generateName(new Chance()),
  );

export default class NewSystemModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCreateSystem: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static defaultProps = {
    x: 0,
    y: 0,
  };

  state = {
    name: generateName(new Chance()),
    planets: generatePlanetNames(),
    initializeBlankPlanets: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({
        name: generateName(new Chance()),
        planets: generatePlanetNames(),
        initializeBlankPlanets: false,
      });
    }
  }

  onNewSystemName = () => {
    this.setState({ name: generateName(new Chance()) });
  };

  onEditSystem = ({ target }) => {
    this.setState({ [target.dataset.key]: target.value });
  };

  onEditPlanet = ({ target }) => {
    const planets = [...this.state.planets];
    planets.splice(Number.parseInt(target.dataset.index, 10), 1, target.value);
    this.setState({ planets });
  };

  onNewPlanetName = index => {
    const planets = [...this.state.planets];
    planets.splice(index, 1, generateName(new Chance()));
    this.setState({ planets });
  };

  onDeletePlanet = ({ target }) => {
    const planets = [...this.state.planets];
    planets.splice(Number.parseInt(target.dataset.index, 10), 1);
    this.setState({ planets });
  };

  onAddPlanet = () => {
    const planets = [...this.state.planets];
    planets.push(generateName(new Chance()));
    this.setState({ planets });
  };

  onUpdateBlankPlanet = ({ target }) => {
    this.setState({ initializeBlankPlanets: target.checked });
  };

  onCreate = () => {
    this.props.onCreateSystem(
      new System(
        { chance: new Chance() },
        this.props.x,
        this.props.y,
        this.state.name,
        this.state.planets,
      ).toJSON(),
    );
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onCancel={this.props.onClose}
        title="Create System"
        actionButtons={[
          <Button primary key="create" onClick={this.onCreate}>
            Create
          </Button>,
        ]}
      >
        <FlexContainer direction="column">
          <Label noPadding htmlFor="name">
            System Name
          </Label>
          <IconInput
            id="name"
            name="name"
            data-key="name"
            icon={RefreshCw}
            value={this.state.name}
            onChange={this.onEditSystem}
            onIconClick={this.onNewSystemName}
          />
        </FlexContainer>
        <Checkbox
          label="Initialize Blank Planets"
          value={this.state.initializeBlankPlanets}
          onChange={this.onUpdateBlankPlanet}
        />
        <FlexContainer direction="column">
          <Label>Planets</Label>
          <FlexContainer direction="column">
            {this.state.planets.map((planet, index) => (
              <FlexContainer
                className="NewSystemModal-Planet"
                key={index}
                align="center"
              >
                <X
                  className="NewSystemModal-Delete"
                  size={25}
                  data-index={index}
                  onClick={this.onDeletePlanet}
                />
                <IconInput
                  name="name"
                  data-index={index}
                  icon={RefreshCw}
                  value={planet}
                  onChange={this.onEditPlanet}
                  onIconClick={() => this.onNewPlanetName(index)}
                />
              </FlexContainer>
            ))}
            <FlexContainer
              className="NewSystemModal-Add"
              align="center"
              onClick={this.onAddPlanet}
            >
              <Plus className="NewSystemModal-Plus" size={20} />
              Add Planet
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </Modal>
    );
  }
}
