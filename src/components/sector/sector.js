import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import styled from 'styled-components';

import hexGenerator from 'utils/hex-generator';

import System from 'components/system';
import SectorSidebar from 'components/sector-sidebar';
import { AbsoluteContainer, FlexContainer, FlexContainerStyle } from 'primitives';
import SystemTooltips from 'components/system-tooltips';

const HexContainer = styled.div`
  backgroundColor: ${props => props.theme.dark4};
`;

const Svg = styled.svg`${FlexContainerStyle}`;

export default class Sector extends Component {
  static propTypes = {
    children: PropTypes.node,
    renderSector: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    height: window.innerHeight,
    width: window.innerWidth - 300,
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
      width: window.innerWidth - 300,
    });
  }, 100);

  renderChildren() {
    if (!this.props.children) {
      return null;
    }
    return (
      <AbsoluteContainer>
        {this.props.children}
      </AbsoluteContainer>
    );
  }

  renderTooltips(hexData) {
    if (!this.props.renderSector) {
      return null;
    }
    const systems = hexData
      .filter(data => data.system)
      .map(({ system, height, xOffset, yOffset }) => ({
        ...system,
        height,
        xOffset,
        yOffset,
      }));
    return <SystemTooltips systems={systems} />;
  }

  render() {
    const hexData = hexGenerator({ ...this.state, ...this.props });

    return (
      <FlexContainer direction="row">
        <HexContainer>
          {this.renderTooltips(hexData)}
          <Svg width={this.state.width} height={this.state.height}>
            {hexData.map(hex => <System {...hex} key={hex.systemKey} />)}
          </Svg>
          {this.renderChildren()}
        </HexContainer>
        <SectorSidebar />
      </FlexContainer>
    );
  }
}
