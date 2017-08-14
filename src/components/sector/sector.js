import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import hexGenerator from 'utils/hex-generator';

import SectorSidebar from 'components/sector-sidebar';
import SystemTooltips from 'components/system-tooltips';
import PrintableSector from 'components/printable-sector';
import FlexContainer from 'primitives/containers/flex-container';
import HexMap from 'components/hex-map';

import './style.css';

export default class Sector extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderSector: PropTypes.bool.isRequired,
    sector: PropTypes.shape({
      rows: PropTypes.number.isRequired,
      columns: PropTypes.number.isRequired,
      systems: PropTypes.shape().isRequired,
    }).isRequired,
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
    const { hexes, printable } = hexGenerator({
      renderSector: true,
      height: this.state.height,
      width: this.state.width,
      systems: this.props.sector.systems,
      rows: this.props.sector.rows,
      columns: this.props.sector.columns,
    });

    return (
      <div>
        <FlexContainer className="Sector" direction="row">
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
        <PrintableSector printable={printable} />
      </div>
    );
  }
}
