import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import hexGenerator from '../../utils/hex-generator';

import { HexContainer, Hex } from './components';
import { AbsoluteContainer } from '../../primitives';

export default class HexCanvas extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

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
  }, 100);

  render() {
    const hexes = hexGenerator({ ...this.state, ...this.props })
      .map(hex => <Hex {...hex} />);

    return (
      <div>
        <HexContainer>
          <svg width={this.state.width} height={this.state.height}>
            {hexes}
          </svg>
        </HexContainer>
        <AbsoluteContainer>
          {this.props.children}
        </AbsoluteContainer>
      </div>
    );
  }
}
