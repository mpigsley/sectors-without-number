import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw, X, Plus } from 'react-feather';
import Chance from 'chance';
import { map, zipObject, omit, values, every } from 'lodash';
import ReactHintFactory from 'react-hint';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';
import Dropdown from 'primitives/form/dropdown';
import FlexContainer from 'primitives/container/flex-container';
import Dice from 'primitives/icons/dice';

import { generateName } from 'utils/name-generator';
// import { System, generatePlanet } from 'utils/sector-generator';
import { coordinatesFromKey } from 'utils/common';

import './style.css';

const ReactHint = ReactHintFactory(React);

const generatePlanetNames = planets => {
  let planetsList;
  if (planets) {
    planetsList = map(planets, ({ key, name }) => ({
      originalKey: key,
      generate: true,
      isSaved: true,
      name,
    }));
  } else {
    const numPlanetArray = Array(new Chance().weighted([1, 2, 3], [5, 3, 2]));
    planetsList = Array.from([...numPlanetArray], () => ({
      name: generateName(new Chance()),
      generate: true,
      isSaved: false,
    }));
  }
  return zipObject(planetsList.map(() => new Chance().hash()), planetsList);
};

export default class SystemEditModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    emptySystemKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    system: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    planets: PropTypes.shape(),
  };

  static defaultProps = {
    system: null,
    planets: null,
  };

  state = {
    name: generateName(new Chance()),
    planets: generatePlanetNames(this.props.planets),
    systemSelect: this.props.emptySystemKeys[0],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({
        name: nextProps.system
          ? nextProps.system.name
          : generateName(new Chance()),
        planets: generatePlanetNames(nextProps.planets),
        systemSelect: this.props.emptySystemKeys[0],
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
    this.setState({
      planets: {
        ...this.state.planets,
        [target.dataset.key]: {
          ...this.state.planets[target.dataset.key],
          name: target.value,
        },
      },
    });
  };

  onChangeGenerate = ({ target }) => {
    this.setState({
      planets: {
        ...this.state.planets,
        [target.dataset.key]: {
          ...this.state.planets[target.dataset.key],
          generate: target.checked,
        },
      },
    });
  };

  onNewPlanetName = key => {
    this.setState({
      planets: {
        ...this.state.planets,
        [key]: {
          ...this.state.planets[key],
          name: generateName(new Chance()),
        },
      },
    });
  };

  onDeletePlanet = key => {
    this.setState({ planets: omit(this.state.planets, key) });
  };

  onAddPlanet = () => {
    this.setState({
      planets: {
        ...this.state.planets,
        [new Chance().hash()]: {
          name: generateName(new Chance()),
          generate: true,
        },
      },
    });
  };

  onSubmit = () => {
    let system;
    const newPlanets = values(this.state.planets).filter(
      planet => !planet.isSaved,
    );

    if (this.props.system) {
      const existingPlanets = values(this.state.planets)
        .filter(planet => planet.isSaved)
        .map(({ originalKey, name }) => ({
          ...this.props.planets[originalKey],
          key: encodeURIComponent(name.toLowerCase()),
          name,
        }));
      const combinedPlanets = existingPlanets.concat(newPlanets);

      system = {
        ...this.props.system,
        name: this.state.name,
        planets: zipObject(
          combinedPlanets.map(({ key }) => key),
          combinedPlanets,
        ),
      };
    } else {
      const { x, y } =
        this.props.system || coordinatesFromKey(this.state.systemSelect);
      system = new System(
        { chance: new Chance() },
        x,
        y,
        this.state.name,
        newPlanets,
      ).toJSON();
    }

    this.props.onSubmit(system);
  };

  get isAllSaved() {
    return every(this.state.planets, ({ isSaved }) => isSaved);
  }

  get isValidForm() {
    return this.props.system || this.state.systemSelect;
  }

  renderLocationSelect = () => {
    if (this.props.system) {
      return null;
    }
    return (
      <FlexContainer direction="column">
        <Label htmlFor="location">Location</Label>
        <Dropdown
          id="location"
          name="location"
          value={this.state.systemSelect}
          clearable={false}
          onChange={({ value }) => this.setState({ systemSelect: value })}
          options={this.props.emptySystemKeys.map(key => ({
            value: key,
            label: key,
          }))}
        />
      </FlexContainer>
    );
  };

  renderEditRow = ({ name, generate, isSaved }, key) => (
    <FlexContainer className="SystemEditModal-Planet" key={key} align="center">
      <X
        className="SystemEditModal-Delete"
        size={25}
        onClick={() => this.onDeletePlanet(key)}
      />
      <IconInput
        name="name"
        data-key={key}
        icon={RefreshCw}
        value={name}
        onChange={this.onEditPlanet}
        onIconClick={() => this.onNewPlanetName(key)}
      />
      <Input
        disabled={isSaved}
        className="SystemEditModal-Generate"
        data-key={key}
        onChange={this.onChangeGenerate}
        checked={generate}
        name="checkbox"
        type="checkbox"
      />
    </FlexContainer>
  );

  render() {
    const action = this.props.system ? 'Edit' : 'Create';
    return (
      <Modal
        isOpen={this.props.isOpen}
        onCancel={this.props.onClose}
        title={`${action} System`}
        actionButtons={[
          <Button
            primary
            key="create"
            onClick={this.onSubmit}
            disabled={!this.isValidForm}
          >
            {action}
          </Button>,
        ]}
      >
        <ReactHint events position="left" />
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
        {this.renderLocationSelect()}
        <FlexContainer direction="column">
          <FlexContainer justify="spaceBetween" align="flexEnd">
            <Label>Planets</Label>
            <Dice data-rh="Select to generate planet data." size={22} />
          </FlexContainer>
          <FlexContainer direction="column">
            {map(this.state.planets, (planet, key) =>
              this.renderEditRow(planet, key),
            )}
            <FlexContainer
              className="SystemEditModal-Add"
              align="center"
              onClick={this.onAddPlanet}
            >
              <Plus className="SystemEditModal-Plus" size={20} />
              Add Planet
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </Modal>
    );
  }
}
