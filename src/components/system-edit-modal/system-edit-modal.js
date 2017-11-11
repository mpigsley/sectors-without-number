import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw, X, Plus } from 'react-feather';
import Chance from 'chance';
import {
  map,
  zipObject,
  omit,
  values,
  every,
  includes,
  uniq,
  filter,
} from 'lodash';
import ReactHintFactory from 'react-hint';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';
import FlexContainer from 'primitives/container/flex-container';
import Dice from 'primitives/icons/dice';

import { generateName } from 'utils/name-generator';
import { System, generatePlanet } from 'utils/sector-generator';
import { coordinatesFromKey } from 'utils/common';

import './style.css';

const ReactHint = ReactHintFactory(React);

const generatePlanetNames = system => {
  let planetsList;
  if (system) {
    planetsList = map(system.planets, ({ key, name }) => ({
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
    systemKey: PropTypes.string.isRequired,
    planetKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    system: PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      planets: PropTypes.shape().isRequired,
    }),
  };

  static defaultProps = {
    system: null,
  };

  state = {
    name: generateName(new Chance()),
    planets: generatePlanetNames(this.props.system),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({
        name: nextProps.system
          ? nextProps.system.name
          : generateName(new Chance()),
        planets: generatePlanetNames(nextProps.system),
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

  onCreate = () => {
    const { x, y } = coordinatesFromKey(this.props.systemKey);

    const existingPlanets = values(this.state.planets)
      .filter(planet => planet.isSaved)
      .map(({ originalKey, name }) => ({
        ...this.props.system.planets[originalKey],
        key: encodeURIComponent(name.toLowerCase()),
        name,
      }));
    const newPlanets = values(this.state.planets)
      .filter(planet => !planet.isSaved)
      .map(generatePlanet);
    const combinedPlanets = existingPlanets.concat(newPlanets);

    let system;
    if (this.props.system) {
      system = {
        ...this.props.system,
        name: this.state.name,
        planets: zipObject(
          combinedPlanets.map(({ key }) => key),
          combinedPlanets,
        ),
      };
    } else {
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

  get areAllUnique() {
    const planetsWithNewNames = filter(
      this.state.planets,
      ({ isSaved, name, originalKey }) =>
        !isSaved || encodeURIComponent(name.toLowerCase()) !== originalKey,
    );

    const newPlanetsUnique =
      planetsWithNewNames.length ===
      uniq(
        planetsWithNewNames.map(({ name }) =>
          encodeURIComponent(name.toLowerCase()),
        ),
      ).length;

    const uniqueToSector = every(
      planetsWithNewNames,
      ({ name }) =>
        name &&
        !includes(
          this.props.planetKeys,
          encodeURIComponent(name.toLowerCase()),
        ),
    );

    return newPlanetsUnique && uniqueToSector;
  }

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

  renderUniqueError = () => {
    if (this.areAllUnique) {
      return null;
    }
    return (
      <div className="SystemEditModal-Error">
        All planet names must be unique throughout the sector.
      </div>
    );
  };

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
            onClick={this.onCreate}
            disabled={!this.areAllUnique}
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
        {this.renderUniqueError()}
      </Modal>
    );
  }
}
