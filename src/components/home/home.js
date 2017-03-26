import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

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
      <HexContainer>
        <svg
          width={width}
          height={height}
        >
          {hexes}
        </svg>
      </HexContainer>
    );
  }
}
