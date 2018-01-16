import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle, isEmpty, map } from 'lodash';

import FlexContainer from 'primitives/container/flex-container';
import EntityTooltips from 'components/entity-tooltips';
import PrintableSector from 'components/printable-sector';
import TopLevelEntityModal from 'components/top-level-entity-modal';
import HexMap from 'components/hex-map';

import hexGenerator from 'utils/hex-generator';
import { coordinateKey } from 'utils/common';
import Loading from './loading';
import Error from './error';

import './style.css';

const calcWidth = () =>
  window.innerWidth > 700 ? window.innerWidth - 400 : window.innerWidth;

export default class SectorMap extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderSector: PropTypes.bool.isRequired,
    isInitialized: PropTypes.bool.isRequired,
    topLevelEntities: PropTypes.shape().isRequired,
    sector: PropTypes.shape({
      rows: PropTypes.number,
      columns: PropTypes.number,
    }),
    closeUserDropdown: PropTypes.func.isRequired,
    generateSector: PropTypes.func.isRequired,
    toSafeRoute: PropTypes.func.isRequired,
    isDropdownActive: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    routeParams: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    sector: {},
  };

  state = {
    height: window.innerHeight,
    width: calcWidth(),
  };

  componentWillMount() {
    const splitPath = this.props.location.pathname.split('/');
    if (splitPath.length > 5 || (splitPath[5] || '').length !== 20) {
      this.props.toSafeRoute(this.props.routeParams.sector);
    }
  }

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
    return (
      <EntityTooltips
        hexes={map(this.props.topLevelEntities, entity => ({
          ...entity,
          ...hexData.find(
            ({ hexKey }) => coordinateKey(entity.x, entity.y) === hexKey,
          ),
        }))}
      />
    );
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
      rows: this.props.sector.rows,
      columns: this.props.sector.columns,
    });

    let { closeUserDropdown } = this.props;
    if (!this.props.isDropdownActive) {
      closeUserDropdown = null;
    }

    return (
      <div onClick={closeUserDropdown}>
        <FlexContainer className="SectorMap" direction="row">
          {this.renderTooltips(hexes)}
          <HexMap
            width={this.state.width}
            height={this.state.height}
            hexes={hexes}
          />
          <div className="SectorMap-Sidebar">{this.props.children}</div>
        </FlexContainer>
        <PrintableSector printable={printable} />
        <TopLevelEntityModal />
      </div>
    );
  }
}
