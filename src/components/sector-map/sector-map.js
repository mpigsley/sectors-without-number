import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';

import EntityTooltips from 'components/entity-tooltips';
import CondensedPrintable from 'components/printables/condensed-printable';
import ExpandedPrintable from 'components/printables/expanded-printable';
import TopLevelEntityModal from 'components/top-level-entity-modal';
import ProfileModal from 'components/profile-modal';
import HexMap from 'components/hex-map';

import ExportTypes from 'constants/export-types';
import { isEmpty, map } from 'constants/lodash';
import hexGenerator from 'utils/hex/generator';
import { coordinateKey } from 'utils/common';
import Loading from './loading';
import Error from './error';

import './style.css';

export default class SectorMap extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderSector: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    topLevelEntities: PropTypes.shape().isRequired,
    sector: PropTypes.shape({
      rows: PropTypes.number,
      columns: PropTypes.number,
    }),
    generateSector: PropTypes.func.isRequired,
    toSafeRoute: PropTypes.func.isRequired,
    fetchSector: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        sector: PropTypes.string,
      }),
    }).isRequired,
    exportType: PropTypes.string.isRequired,
    isPrinting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    sector: {},
  };

  componentWillMount() {
    const splitPath = this.props.location.pathname.split('/');
    if (
      splitPath.length > 5 ||
      (splitPath[4] || splitPath[2] || '').length !== 20
    ) {
      this.props.toSafeRoute(this.props.match.params.sector);
    } else {
      this.props.fetchSector();
    }
  }

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

  renderPrintable(printable) {
    if (!this.props.isPrinting) {
      return null;
    }
    if (this.props.exportType === ExportTypes.expanded.key) {
      return <ExpandedPrintable printable={printable} />;
    }
    return <CondensedPrintable printable={printable} />;
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    } else if (isEmpty(this.props.sector)) {
      return <Error generateSector={this.props.generateSector} />;
    }

    return (
      <div className="SectorMap">
        <Measure>
          {({ measureRef, contentRect }) => {
            const { height, width } = contentRect.entry;
            const { hexes, printable } = hexGenerator({
              renderSector: true,
              height,
              width,
              rows: this.props.sector.rows,
              columns: this.props.sector.columns,
            });
            return (
              <div ref={measureRef} className="SectorMap-Map">
                <HexMap width={width} height={height} hexes={hexes} isSector />
                {this.renderTooltips(hexes)}
                {this.renderPrintable(printable)}
              </div>
            );
          }}
        </Measure>
        <div className="SectorMap-Sidebar">{this.props.children}</div>
        <TopLevelEntityModal />
        <ProfileModal />
      </div>
    );
  }
}
