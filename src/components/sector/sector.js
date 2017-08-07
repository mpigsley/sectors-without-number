import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import ReduxToastr from 'react-redux-toastr';

import hexGenerator from 'utils/hex-generator';

import SectorSidebar from 'components/sector-sidebar';
import FlexContainer from 'primitives/containers/flex-container';
import SystemTooltips from 'components/system-tooltips';
import HexMap from 'components/hex-map';

import './style.css';

export default class Sector extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderSector: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.onResize = this.onResize.bind(this);
  }

  state = {
    height: window.innerHeight,
    width:
      window.innerWidth > 700 ? window.innerWidth - 350 : window.innerWidth,
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
      width:
        window.innerWidth > 700 ? window.innerWidth - 350 : window.innerWidth,
    });
  }, 100);

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
    const { hexes, printables } = hexGenerator({
      renderSector: true,
      ...this.state,
      ...this.props,
    });

    return (
      <div>
        <FlexContainer className="Sector" direction="row">
          <ReduxToastr position="bottom-left" newestOnTop={false} progressBar />
          {this.renderTooltips(hexes)}
          <HexMap
            width={this.state.width}
            height={this.state.height}
            hexes={hexes}
          />
          <SectorSidebar>
            {this.props.children}
          </SectorSidebar>
        </FlexContainer>
        <div className="Sector-Printable">
          <HexMap
            width={printables.width}
            height={printables.height}
            hexes={printables.hexes}
          />
        </div>
      </div>
    );
  }
}
