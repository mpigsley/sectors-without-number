import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { generateHexCoordinates } from '../../utils/hex-helper';

import {
  HexContainer,
  Hex,
} from './components';

const hexWidth = 50;
const hexPadding = 2;

export default class HexBackground extends Component {
  static propTypes = {
    children: PropTypes.node.isRequried,
  }

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
        {this.props.children}
      </div>
    );
  }
}
