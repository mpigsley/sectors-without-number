import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw, X, Plus } from 'react-feather';
import Chance from 'chance';
import ReactHintFactory from 'react-hint';

import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';
import FlexContainer from 'primitives/container/flex-container';
import Dice from 'primitives/icons/dice';

import { generateName } from 'utils/name-generator';
import { capitalizeFirstLetter } from 'utils/common';

import './style.css';

const ReactHint = ReactHintFactory(React);

export default class EditableMultiSelect extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    nameGenerator: PropTypes.func,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string,
        generate: PropTypes.bool.isRequired,
      }),
    ).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    nameGenerator: generateName,
  };

  onEditItem = index => ({ target }) => {
    const planets = [...this.props.items];
    planets.splice(index, 1, {
      ...this.props.items[index],
      name: target.value,
    });
    this.props.onChange(planets);
  };

  onChangeGenerate = index => ({ target }) => {
    const planets = [...this.props.items];
    planets.splice(index, 1, {
      ...this.props.items[index],
      generate: target.checked,
    });
    console.log(planets);
    this.props.onChange(planets);
  };

  onNewItemName = index => {
    const planets = [...this.props.items];
    planets.splice(index, 1, {
      ...this.props.items[index],
      name: this.props.nameGenerator(new Chance()),
    });
    this.props.onChange(planets);
  };

  onDeleteItem = index => {
    const planets = [...this.props.items];
    planets.splice(Number.parseInt(index, 10), 1);
    this.props.onChange(planets);
  };

  onAddItem = () => {
    const planets = [...this.props.items];
    planets.push({
      key: new Chance().hash(),
      name: generateName(new Chance()),
      generate: true,
    });
    this.props.onChange(planets);
  };

  render() {
    return (
      <FlexContainer direction="column">
        <ReactHint events position="left" />
        <FlexContainer justify="spaceBetween" align="flexEnd">
          <Label>{capitalizeFirstLetter(this.props.name)}</Label>
          <Dice
            data-rh={`Select to generate ${this.props.name.toLowerCase()} data.`}
            size={22}
          />
        </FlexContainer>
        <FlexContainer direction="column">
          {this.props.items.map(({ key, name, generate }, index) => (
            <FlexContainer
              className="EditableMultiSelect-Item"
              key={key}
              align="center"
            >
              <X
                className="EditableMultiSelect-Delete"
                size={25}
                onClick={() => this.onDeleteItem(index)}
              />
              <IconInput
                name="name"
                data-index={index}
                icon={RefreshCw}
                value={name}
                onChange={this.onEditItem(index)}
                onIconClick={() => this.onNewItemName(index)}
              />
              <Input
                className="EditableMultiSelect-Generate"
                onChange={this.onChangeGenerate(index)}
                checked={generate}
                name="checkbox"
                type="checkbox"
              />
            </FlexContainer>
          ))}
          <FlexContainer
            className="EditableMultiSelect-Add"
            align="center"
            onClick={this.onAddItem}
          >
            <Plus className="EditableMultiSelect-Plus" size={20} />
            Add {capitalizeFirstLetter(this.props.name)}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
