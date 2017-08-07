import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import hexGenerator from 'utils/hex-generator';

import HexMap from 'components/hex-map';
import AbsoluteContainer from 'primitives/containers/absolute-container';

export default class HexBackground extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.onResize = this.onResize.bind(this);
  }

  state = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = throttle(() => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, 100);

  render() {
    const { hexes } = hexGenerator({
      renderSector: false,
      ...this.state,
      ...this.props,
    });

    return (
      <div>
        <HexMap
          width={this.state.width}
          height={this.state.height}
          hexes={hexes}
        />
        <AbsoluteContainer>
          {this.props.children}
        </AbsoluteContainer>
      </div>
    );
  }
}
