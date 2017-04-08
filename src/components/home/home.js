import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import {
  AbsoluteContainer,
  FlexContainer,
  FlexContainerStyle,
  Header1,
  Header2,
  Media,
  Button,
} from '../../primitives';
import Hexagon from '../hexagon';
import { generateHexCoordinates } from '../../utils/hex-helper';

const hexWidth = 50;
const hexPadding = 2;

const HexContainer = styled.div`
  backgroundColor: ${props => props.theme.darkest};
  display: flex;
`;
const Hex = styled(Hexagon)`
  fill: ${props => props.theme.darker};
`;
const RowContainer = styled.div`
  flex: 1;
`;
const Row = styled.hr`
  height: 1px;
  margin: 0 10%;
  border: none;
  background: ${props => props.left
    ? 'linear-gradient(to left, rgba(255, 255, 255, 0.8), transparent);'
    : 'linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent);'}
  ${Media.tablet`
    display: none;  
  `}
`;
const ContentContainer = styled(AbsoluteContainer)`
  color: ${props => props.theme.lightest};
  ${FlexContainerStyle}
`;
const SubContainer = styled(FlexContainer)`
  width: 100%;
  text-align: center;
`;
const HomeButton = styled(Button)`
  margin: 0 1rem;
`;

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
  }, 50)

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
