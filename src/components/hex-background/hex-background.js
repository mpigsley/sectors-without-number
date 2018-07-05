import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import HexMap from 'components/hex-map';
import AbsoluteContainer from 'primitives/container/absolute-container';
import Button from 'primitives/other/button';

import hexGenerator from 'utils/hex/generator';
import { debounce } from 'constants/lodash';

import './style.css';

export default class HexBackground extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    openLoginModal: PropTypes.func.isRequired,
    isInitialized: PropTypes.bool.isRequired,
    uid: PropTypes.string,
  };

  static defaultProps = {
    uid: null,
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

  onResize = debounce(() => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, 100);

  renderLoginButton = () => {
    if (!this.props.isInitialized || this.props.uid) {
      return null;
    }
    return (
      <Button
        className="HexBackground-Login"
        onClick={this.props.openLoginModal}
      >
        <FormattedMessage id="misc.logIn" />
      </Button>
    );
  };

  render() {
    const { hexes } = hexGenerator({
      renderSector: false,
      width: this.state.width,
      height: this.state.height,
    });

    return (
      <Fragment>
        <HexMap
          width={this.state.width}
          height={this.state.height}
          hexes={hexes}
        />
        <AbsoluteContainer>
          {this.renderLoginButton()}
          {this.props.children}
        </AbsoluteContainer>
      </Fragment>
    );
  }
}
