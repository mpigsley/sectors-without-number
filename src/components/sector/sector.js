import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle, isEmpty } from 'lodash';

import FlexContainer from 'primitives/container/flex-container';
import SectorSidebar from 'components/sector-sidebar';
import SystemTooltips from 'components/system-tooltips';
import PrintableSector from 'components/printable-sector';
import NewSystemModal from 'components/new-system-modal';
import HexMap from 'components/hex-map';

import hexGenerator from 'utils/hex-generator';
import { coordinatesFromKey } from 'utils/common';
import Loading from './loading';
import Error from './error';

import './style.css';

const calcWidth = () =>
  window.innerWidth > 700 ? window.innerWidth - 400 : window.innerWidth;

export default class Sector extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderSector: PropTypes.bool.isRequired,
    isInitialized: PropTypes.bool.isRequired,
    sector: PropTypes.shape({
      rows: PropTypes.number,
      columns: PropTypes.number,
      systems: PropTypes.shape(),
    }),
    createSystemKey: PropTypes.string,
    editSystem: PropTypes.func.isRequired,
    closeSystemCreate: PropTypes.func.isRequired,
    closeUserDropdown: PropTypes.func.isRequired,
    generateSector: PropTypes.func.isRequired,
    isDropdownActive: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    createSystemKey: null,
    sector: {},
  };

  state = {
    height: window.innerHeight,
    width: calcWidth(),
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
      width: calcWidth(),
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
    if (!this.props.isInitialized) {
      return <Loading />;
    } else if (isEmpty(this.props.sector)) {
      return <Error generateSector={this.props.generateSector} />;
    }

    const { hexes, printable } = hexGenerator({
      renderSector: true,
      height: this.state.height,
      width: this.state.width,
      systems: this.props.sector.systems,
      rows: this.props.sector.rows,
      columns: this.props.sector.columns,
    });

    let { closeUserDropdown } = this.props;
    if (!this.props.isDropdownActive) {
      closeUserDropdown = null;
    }

    return (
      <div onClick={closeUserDropdown}>
        <FlexContainer className="Sector" direction="row">
          {this.renderTooltips(hexes)}
          <HexMap
            width={this.state.width}
            height={this.state.height}
            hexes={hexes}
          />
          <SectorSidebar>{this.props.children}</SectorSidebar>
        </FlexContainer>
        <PrintableSector printable={printable} />
        <NewSystemModal
          {...coordinatesFromKey(this.props.createSystemKey)}
          isOpen={!!this.props.createSystemKey}
          onClose={this.props.closeSystemCreate}
          onCreateSystem={system => {
            this.props.editSystem(system.key, system);
          }}
        />
      </div>
    );
  }
}
