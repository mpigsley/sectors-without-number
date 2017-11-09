import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw } from 'react-feather';
import Chance from 'chance';
import ReactHintFactory from 'react-hint';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import EditableMultiSelect from 'primitives/form/editable-multi-select';
import FlexContainer from 'primitives/container/flex-container';

import { generateName } from 'utils/name-generator';
import { System, generatePlanet } from 'utils/sector-generator';

const ReactHint = ReactHintFactory(React);

const generatePlanetNames = () =>
  Array.from([...Array(new Chance().weighted([1, 2, 3], [5, 3, 2]))], () => ({
    key: new Chance().hash(),
    name: generateName(new Chance()),
    generate: true,
  }));

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

  onCreate = () => {
    this.props.onCreateSystem(
      new System(
        { chance: new Chance() },
        this.props.x,
        this.props.y,
        this.state.name,
        this.state.planets.map(generatePlanet),
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
        <EditableMultiSelect
          name="Planets"
          items={this.state.planets}
          onChange={planets => this.setState({ planets })}
        />
      </Modal>
    );
  }
}
