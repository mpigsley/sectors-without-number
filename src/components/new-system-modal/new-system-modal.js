import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw, X, Plus } from 'react-feather';
import Chance from 'chance';
import { map, zipObject, omit, values } from 'lodash';
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

import './style.css';

const ReactHint = ReactHintFactory(React);

const generatePlanetNames = () => {
  const list = [...Array(new Chance().weighted([1, 2, 3], [5, 3, 2]))];
  return zipObject(
    Array.from(list, () => new Chance().hash()),
    Array.from(list, () => ({
      name: generateName(new Chance()),
      generate: true,
    })),
  );
};

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
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({
        name: generateName(new Chance()),
        planets: generatePlanetNames(),
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
    this.props.onCreateSystem(
      new System(
        { chance: new Chance() },
        this.props.x,
        this.props.y,
        this.state.name,
        values(this.state.planets).map(generatePlanet),
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
            {map(this.state.planets, ({ name, generate }, key) => (
              <FlexContainer
                className="NewSystemModal-Planet"
                key={key}
                align="center"
              >
                <X
                  className="NewSystemModal-Delete"
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
                  className="NewSystemModal-Generate"
                  data-key={key}
                  onChange={this.onChangeGenerate}
                  checked={generate}
                  name="checkbox"
                  type="checkbox"
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
