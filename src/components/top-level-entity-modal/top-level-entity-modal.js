import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw, X, Plus } from 'react-feather';
import Chance from 'chance';
import ReactHintFactory from 'react-hint';
import {
  filter,
  map,
  mapValues,
  zipObject,
  omit,
  values,
  size,
  pickBy,
} from 'lodash';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';
import Dropdown from 'primitives/form/dropdown';
import FlexContainer from 'primitives/container/flex-container';
import Dice from 'primitives/icons/dice';

import Entities from 'constants/entities';
import { createId, coordinatesFromKey } from 'utils/common';

import './style.css';

const ReactHint = ReactHintFactory(React);
const TopLevelLeveEntities = filter(Entities, entity => entity.topLevel);

const generatePlanetNames = () => {
  const numPlanetArray = Array(new Chance().weighted([1, 2, 3], [5, 3, 2]));
  const planetsList = Array.from([...numPlanetArray], () => ({
    name: Entities.planet.nameGenerator(),
    generate: true,
  }));
  return {
    [Entities.planet.key]: zipObject(
      planetsList.map(() => createId()),
      planetsList,
    ),
  };
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

  onEditEntity = ({ target }) => {
    this.setState({ [target.dataset.key]: target.value });
  };

  onChangeChildType = (entityType, entityId) => item => {
    if (entityType !== item.value) {
      const oldEntity = this.state.children[entityType][entityId];
      this.setState({
        children: {
          ...this.state.children,
          [entityType]: omit(this.state.children[entityType], entityId),
          [item.value]: {
            ...this.state.children[item.value],
            [entityId]: {
              ...oldEntity,
              name: Entities[item.value].nameGenerator(),
            },
          },
        },
      });
    }
  };

  onEditChild = (entityType, entityId) => ({ target }) => {
    this.setState({
      children: {
        ...this.state.children,
        [entityType]: {
          ...this.state.children[entityType],
          [entityId]: {
            ...this.state.children[entityType][entityId],
            name: target.value,
          },
        },
      },
    });
  };

  onChangeGenerate = (entityType, entityId) => ({ target }) => {
    this.setState({
      children: {
        ...this.state.children,
        [entityType]: {
          ...this.state.children[entityType],
          [entityId]: {
            ...this.state.children[entityType][entityId],
            generate: target.checked,
          },
        },
      },
    });
  };

  onNewChildName = (entityType, entityId) => {
    this.setState({
      children: {
        ...this.state.children,
        [entityType]: {
          ...this.state.children[entityType],
          [entityId]: {
            ...this.state.children[entityType][entityId],
            name: Entities[entityType].nameGenerator(),
          },
        },
      },
    });
  };

  onDeleteChild = (entityType, entityId) => {
    this.setState({
      children: pickBy(
        {
          ...this.state.children,
          [entityType]: omit(this.state.children[entityType], entityId),
        },
        size,
      ),
    });
  };

  onAddChild = () => {
    this.setState({
      children: {
        ...this.state.children,
        [Entities.planet.key]: {
          ...this.state.children[Entities.planet.key],
          [createId()]: {
            name: Entities.planet.nameGenerator(),
            generate: true,
          },
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
        children: mapValues(this.state.children, child => values(child)),
        ...coordinatesFromKey(this.props.topLevelKey),
        parent: this.props.currentSector,
        parentEntity: Entities.sector.key,
      },
    );

  renderEditRow = (entityType, { name, generate }, key) => (
    <FlexContainer
      className="TopLevelEntityModal-Planet"
      key={key}
      align="center"
    >
      <X
        className="TopLevelEntityModal-Delete"
        size={25}
        onClick={() => this.onDeleteChild(entityType, key)}
      />
      <Dropdown
        wrapperClassName="TopLevelEntityModal-Type"
        value={entityType}
        onChange={this.onChangeChildType(entityType, key)}
        options={Entities[this.state.entityType].children.map(child => ({
          value: child,
          label: Entities[child].name,
        }))}
      />
      <IconInput
        className="TopLevelEntityModal-Name"
        name="name"
        icon={RefreshCw}
        value={name}
        onChange={this.onEditChild(entityType, key)}
        onIconClick={() => this.onNewChildName(entityType, key)}
      />
      <Input
        className="TopLevelEntityModal-Generate"
        onChange={this.onChangeGenerate(entityType, key)}
        checked={generate}
        name="checkbox"
        type="checkbox"
      />
    </FlexContainer>
  );

  render() {
    return (
      <Modal
        doubleSize
        isOpen={this.props.isOpen}
        onCancel={this.props.cancelTopLevelEntityCreate}
        title="Create Sector Entity"
        actionButtons={[
          <Button primary key="create" onClick={this.onSubmit}>
            Create
          </Button>,
        ]}
      >
        <ReactHint events position="left" />
        <FlexContainer>
          <FlexContainer
            direction="column"
            className="TopLevelEntityModal-Type"
          >
            <Label noPadding htmlFor="name">
              Entity Type
            </Label>
            <Dropdown
              value={this.state.entityType}
              onChange={item =>
                this.setState({ entityType: (item || {}).value })
              }
              options={TopLevelLeveEntities.map(attr => ({
                value: attr.key,
                label: attr.name,
              }))}
            />
          </FlexContainer>
          <FlexContainer
            direction="column"
            className="TopLevelEntityModal-Name"
          >
            <Label noPadding htmlFor="name">
              {Entities[this.state.entityType].name} Name
            </Label>
            <IconInput
              id="name"
              name="name"
              data-key="name"
              icon={RefreshCw}
              value={this.state.name}
              onChange={this.onEditEntity}
              onIconClick={this.onNewEntityName}
            />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer direction="column">
          <FlexContainer justify="spaceBetween" align="flexEnd">
            <Label>Children</Label>
            <Dice data-rh="Select to generate entity data." size={22} />
          </FlexContainer>
          <FlexContainer direction="column">
            {map(this.state.children, (entities, entityType) =>
              map(entities, (child, key) =>
                this.renderEditRow(entityType, child, key),
              ),
            )}
            <FlexContainer
              className="TopLevelEntityModal-Add"
              align="center"
              onClick={this.onAddChild}
            >
              <Plus className="TopLevelEntityModal-Plus" size={20} />
              Add Child
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </Modal>
    );
  }
}
