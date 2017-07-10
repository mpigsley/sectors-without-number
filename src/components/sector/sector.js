import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import styled from 'styled-components';

import hexGenerator from 'utils/hex-generator';

import System from 'components/system';
import { AbsoluteContainer } from 'primitives';

const HexContainer = styled.div`
  backgroundColor: ${props => props.theme.darkest};
`;

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
      .map(hex => <System {...hex} />);

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
