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

import Entities from 'constants/entities';
import { createId, coordinatesFromKey } from 'utils/common';

import './style.css';

const ReactHint = ReactHintFactory(React);

const generatePlanetNames = () => {
  const numPlanetArray = Array(new Chance().weighted([1, 2, 3], [5, 3, 2]));
  const planetsList = Array.from([...numPlanetArray], () => ({
    name: Entities.planet.nameGenerator(),
    generate: true,
  }));
  return zipObject(planetsList.map(() => createId()), planetsList);
};

export default class TopLevelEntityModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    topLevelKey: PropTypes.string,
    currentSector: PropTypes.string.isRequired,
    cancelTopLevelEntityCreate: PropTypes.func.isRequired,
    generateEntity: PropTypes.func.isRequired,
  };

  static defaultProps = {
    topLevelKey: '',
  };

  state = {
    name: Entities.system.nameGenerator(),
    children: generatePlanetNames(),
    entityType: Entities.system.key,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({
        name: Entities[this.state.entityType].nameGenerator(),
        children: generatePlanetNames(),
      });
    }
  }

  onNewEntityName = () => {
    this.setState({ name: Entities[this.state.entityType].nameGenerator() });
  };

  onEditSystem = ({ target }) => {
    this.setState({ [target.dataset.key]: target.value });
  };

  onEditChild = ({ target }) => {
    this.setState({
      children: {
        ...this.state.children,
        [target.dataset.key]: {
          ...this.state.children[target.dataset.key],
          name: target.value,
        },
      },
    });
  };

  onChangeGenerate = ({ target }) => {
    this.setState({
      children: {
        ...this.state.children,
        [target.dataset.key]: {
          ...this.state.children[target.dataset.key],
          generate: target.checked,
        },
      },
    });
  };

  onNewChildName = key => {
    this.setState({
      children: {
        ...this.state.children,
        [key]: {
          ...this.state.children[key],
          name: Entities.planet.nameGenerator(),
        },
      },
    });
  };

  onDeleteChild = key => {
    this.setState({ children: omit(this.state.children, key) });
  };

  onAddChild = () => {
    this.setState({
      children: {
        ...this.state.children,
        [createId()]: {
          name: Entities.planet.nameGenerator(),
          generate: true,
        },
      },
    });
  };

  onSubmit = () =>
    this.props.generateEntity(
      {
        name: this.state.name,
        entityType: this.state.entityType,
      },
      {
        generate: true,
        children: { [Entities.planet.key]: values(this.state.children) },
        ...coordinatesFromKey(this.props.topLevelKey),
        parent: this.props.currentSector,
        parentEntity: Entities.sector.key,
      },
    );

  renderEditRow = ({ name, generate }, key) => (
    <FlexContainer
      className="TopLevelEntityModal-Planet"
      key={key}
      align="center"
    >
      <X
        className="TopLevelEntityModal-Delete"
        size={25}
        onClick={() => this.onDeleteChild(key)}
      />
      <IconInput
        name="name"
        data-key={key}
        icon={RefreshCw}
        value={name}
        onChange={this.onEditChild}
        onIconClick={() => this.onNewChildName(key)}
      />
      <Input
        className="TopLevelEntityModal-Generate"
        data-key={key}
        onChange={this.onChangeGenerate}
        checked={generate}
        name="checkbox"
        type="checkbox"
      />
    </FlexContainer>
  );

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onCancel={this.props.cancelTopLevelEntityCreate}
        title="Create System"
        actionButtons={[
          <Button primary key="create" onClick={this.onSubmit}>
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
            onIconClick={this.onNewEntityName}
          />
        </FlexContainer>
        <FlexContainer direction="column">
          <FlexContainer justify="spaceBetween" align="flexEnd">
            <Label>Planets</Label>
            <Dice data-rh="Select to generate planet data." size={22} />
          </FlexContainer>
          <FlexContainer direction="column">
            {map(this.state.children, (planet, key) =>
              this.renderEditRow(planet, key),
            )}
            <FlexContainer
              className="TopLevelEntityModal-Add"
              align="center"
              onClick={this.onAddChild}
            >
              <Plus className="TopLevelEntityModal-Plus" size={20} />
              Add Planet
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </Modal>
    );
  }
}
