import React, { Component } from 'react';
import Chance from 'chance';
import { Zap } from 'react-feather';

import {
  Header2,
  Link,
  ContentContainer,
  SubContainer,
  Input,
  Label,
  LinkIcon,
} from '../../primitives';
import { ButtonContainer, PaddedButtons } from './components';

export default class Configure extends Component {
  constructor(props) {
    super(props);
    this.updateInput = this.updateInput.bind(this);
  }

  state = {
    seed: new Chance().hash({ length: 15 }),
    columns: 8,
    rows: 10,
  };

  updateInput(e) {
    const key = e.target.getAttribute('data-key');
    this.setState({ [key]: e.target.value });
  }

  render() {
    const { seed, columns, rows } = this.state;
    return (
      <ContentContainer direction="column" align="center" justify="center">
        <Header2>Configure</Header2>
        <SubContainer noMargin direction="column" align="flex-start">
          <Label noPadding htmlFor="seed">
            Seed
          </Label>
          <Input data-key="seed" onChange={this.updateInput} name="seed" type="text" value={seed} />
          <SubContainer noMargin>
            <ButtonContainer noMargin direction="column" align="flex-start">
              <Label htmlFor="rows">Rows</Label>
              <Input
                data-key="rows"
                onChange={this.updateInput}
                name="rows"
                type="number"
                value={rows}
              />
            </ButtonContainer>
            <ButtonContainer noMargin direction="column" align="flex-start">
              <Label htmlFor="columns">Columns</Label>
              <Input
                data-key="columns"
                onChange={this.updateInput}
                name="columns"
                type="number"
                value={columns}
              />
            </ButtonContainer>
          </SubContainer>
        </SubContainer>
        <PaddedButtons wrap justify="center" align="center">
          <Link
            padded
            to={{
              pathname: '/sector',
              seed: new Chance().hash({ length: 15 }),
              rows: 10,
              columns: 8,
            }}
          >
            <LinkIcon icon={Zap} size="20" />
            Generate
          </Link>
        </PaddedButtons>
      </ContentContainer>
    );
  }
}
