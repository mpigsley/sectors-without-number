import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import hexGenerator from 'utils/hex-generator';

import Hexagon from 'components/hexagon';
import { AbsoluteContainer } from 'primitives';
import { HexContainer } from './components';

export default class Sector extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
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

  onResize = throttle(() => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, 100);

  render() {
    const hexes = hexGenerator({ ...this.state, ...this.props })
      .map(hex => <Hexagon {...hex} />);

    let childrenNode = null;
    if (this.props.children) {
      childrenNode = (
        <AbsoluteContainer>
          {this.props.children}
        </AbsoluteContainer>
      );
    }

    return (
      <div>
        <HexContainer>
          <svg width={this.state.width} height={this.state.height}>
            {hexes}
          </svg>
          {childrenNode}
        </HexContainer>
      </div>
    );
  }
}
