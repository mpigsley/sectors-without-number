import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw } from 'react-feather';
import Chance from 'chance';

import Modal from 'primitives/other/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';
import FlexContainer from 'primitives/containers/flex-container';

import { generateName } from 'utils/name-generator';
import { System } from 'utils/sector-generator';

export default class NewSystemModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCreateSystem: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.onRandomizeName = this.onRandomizeName.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onEditText = this.onEditText.bind(this);
  }

  state = {
    name: generateName(new Chance()),
    numPlanets: new Chance().weighted([1, 2, 3], [5, 3, 2]),
  };

  onRandomizeName() {
    this.setState({ name: generateName(new Chance()) });
  }

  onCreate() {
    this.props.onCreateSystem(
      new System(
        { seededChance: new Chance() },
        this.props.x,
        this.props.y,
        this.state.name,
        Number.parseInt(this.state.numPlanets, 10),
      ).toJSON(),
    );
  }

  onEditText({ target }) {
    this.setState({ [target.dataset.key]: target.value });
  }

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
            onChange={this.onEditText}
            onIconClick={this.onRandomizeName}
          />
        </FlexContainer>
        <FlexContainer direction="column">
          <Label htmlFor="numPlanets">Number of Planets</Label>
          <Input
            id="numPlanets"
            name="numPlanets"
            data-key="numPlanets"
            type="number"
            value={this.state.numPlanets}
            onChange={this.onEditText}
          />
        </FlexContainer>
      </Modal>
    );
  }
}
