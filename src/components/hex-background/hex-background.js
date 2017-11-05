import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import hexGenerator from 'utils/hex-generator';

import HexMap from 'components/hex-map';
import AccountManager from 'components/account-manager';
import AbsoluteContainer from 'primitives/container/absolute-container';

export default class HexBackground extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    closeUserDropdown: PropTypes.func.isRequired,
    isDropdownActive: PropTypes.bool.isRequired,
  };

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

    let { closeUserDropdown } = this.props;
    if (!this.props.isDropdownActive) {
      closeUserDropdown = null;
    }

    return (
      <div onClick={closeUserDropdown}>
        <HexMap
          width={this.state.width}
          height={this.state.height}
          hexes={hexes}
        />
        <AbsoluteContainer>
          <AccountManager />
          {this.props.children}
        </AbsoluteContainer>
      </div>
    );
  }
}
