import React, { Component } from 'react';
import Chance from 'chance';

import {
  Header2,
  Link,
  ContentContainer,
  SubContainer,
} from '../../primitives';

export default class Configure extends Component {
  state = {
    seed: new Chance().hash({ length: 15 }),
    columns: 8,
    rows: 10,
  }

  render() {
    const { seed, columns, rows } = this.state;
    return (
      <ContentContainer direction="column" align="center" justify="center">
        <Header2>Configure</Header2>
        <SubContainer wrap justify="center" align="center">
          <Link padded to="/">Back</Link>
          <Link padded to={`/sector?s=${seed}&c=${columns}&r=${rows}`}>Generate</Link>
        </SubContainer>
      </ContentContainer>
    );
  }
}
