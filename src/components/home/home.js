import React, { Component } from 'react';
import _ from 'lodash';

import { generateHexCoordinates } from '../../utils/hex-helper';

import {
  Header1,
  Header2,
} from '../../primitives';
import {
  HexContainer,
  Hex,
  RowContainer,
  Row,
  ContentContainer,
  SubContainer,
  HomeButton,
} from './components';

const hexWidth = 50;
const hexPadding = 2;

export default class Home extends Component {
  state = {
    height: window.innerHeight,
    width: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize = _.throttle(() => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, 100)

  render() {
    const { width, height } = this.state;
    const hexes = generateHexCoordinates({
      width,
      height,
      hexWidth,
      hexPadding,
    }).map(hex => <Hex {...hex} />);

    return (
      <div>
        <HexContainer>
          <svg
            width={width}
            height={height}
          >
            {hexes}
          </svg>
        </HexContainer>
        <ContentContainer direction="column" align="center" justify="center">
          <Header1>Sector.io</Header1>
          <SubContainer justify="center" align="center">
            <RowContainer><Row left /></RowContainer>
            <Header2>Stars Without Number Generator</Header2>
            <RowContainer><Row right /></RowContainer>
          </SubContainer>
          <SubContainer justify="center" align="center">
            <HomeButton>Generate Sector</HomeButton>
            <HomeButton>SWN Source Book</HomeButton>
          </SubContainer>
        </ContentContainer>
      </div>
    );
  }
}
