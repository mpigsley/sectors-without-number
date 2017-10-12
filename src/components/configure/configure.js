import React, { Component } from 'react';
import { Zap, Edit3 } from 'react-feather';
import Chance from 'chance';

import Header, { HeaderType } from 'primitives/text/header';
import AbsoluteContainer from 'primitives/container/absolute-container';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';
import Input from 'primitives/form/input';
import Label from 'primitives/form/label';
import LinkIcon from 'primitives/other/link-icon';
import ButtonLink from 'primitives/other/button-link';

import './style.css';

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
    let value = e.target.value;
    if (e.target.type === 'number') {
      value = value ? Number.parseInt(value, 10) : null;
    }
    this.setState({ [key]: value });
  }

  render() {
    const invalidText =
      this.state.columns > 20 || this.state.rows > 20 ? (
        <div className="Configure-Invalid">
          Column and row count can not be greater than 20.
        </div>
      ) : null;

    return (
      <AbsoluteContainer>
        <ContentContainer direction="column" align="center" justify="center">
          <Header type={HeaderType.header2}>Configure</Header>
          <SubContainer noMargin direction="column" align="flexStart">
            {invalidText}
            <Label noPadding htmlFor="seed">
              Seed
            </Label>
            <Input
              data-key="seed"
              onChange={this.updateInput}
              name="seed"
              type="text"
              value={this.state.seed}
            />
            <SubContainer noMargin>
              <SubContainer
                className="Configure-ButtonContainer"
                noMargin
                direction="column"
                align="flexStart"
              >
                <Label htmlFor="rows">Rows</Label>
                <Input
                  data-key="rows"
                  onChange={this.updateInput}
                  name="rows"
                  type="number"
                  value={this.state.rows || ''}
                />
              </SubContainer>
              <SubContainer
                className="Configure-ButtonContainer"
                noMargin
                direction="column"
                align="flexStart"
              >
                <Label htmlFor="columns">Columns</Label>
                <Input
                  data-key="columns"
                  onChange={this.updateInput}
                  name="columns"
                  type="number"
                  value={this.state.columns || ''}
                />
              </SubContainer>
            </SubContainer>
          </SubContainer>
          <SubContainer
            className="Configure-PaddedButtons"
            wrap
            justify="center"
            align="center"
          >
            <ButtonLink
              to={{
                pathname: '/sector',
                query: {
                  s: this.state.seed,
                  c: this.state.columns,
                  r: this.state.rows,
                },
              }}
            >
              <LinkIcon icon={Zap} size="20" />
              Generate
            </ButtonLink>
            <ButtonLink
              to={{
                pathname: '/sector',
                query: {
                  s: this.state.seed,
                  c: this.state.columns,
                  r: this.state.rows,
                  b: true,
                },
              }}
            >
              <LinkIcon icon={Edit3} size="20" />
              Builder
            </ButtonLink>
          </SubContainer>
        </ContentContainer>
      </AbsoluteContainer>
    );
  }
}
