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
import { map } from 'constants/lodash';
import hexGenerator from 'utils/hex/generator';
import { coordinateKey } from 'utils/common';
import Loading from './loading';
import Error from './error';

import './style.scss';

export default class SectorMap extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderSector: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    doesNotExist: PropTypes.bool.isRequired,
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

  constructor(props) {
    super(props);

    const { location, toSafeRoute, match, fetchSector } = props;
    const splitPath = location.pathname.split('/');
    if (
      splitPath.length > 5 ||
      (splitPath[4] || splitPath[2] || '').length !== 20
    ) {
      toSafeRoute(match.params.sector);
    } else {
      fetchSector();
    }
  }

  renderTooltips(hexData) {
    const { renderSector, topLevelEntities } = this.props;
    if (!renderSector) {
      return null;
    }
    return (
      <EntityTooltips
        hexes={map(topLevelEntities, entity => ({
          ...entity,
          ...hexData.find(
            ({ hexKey }) => coordinateKey(entity.x, entity.y) === hexKey,
          ),
        }))}
      />
    );
  }

  renderPrintable(printable) {
    const { isPrinting, exportType } = this.props;
    if (!isPrinting) {
      return null;
    }
    if (exportType === ExportTypes.expanded.key) {
      return <ExpandedPrintable printable={printable} />;
    }
    return <CondensedPrintable printable={printable} />;
  }

  render() {
    const {
      isLoading,
      doesNotExist,
      generateSector,
      sector,
      children,
    } = this.props;
    if (isLoading) {
      return <Loading />;
    }
    if (doesNotExist) {
      return <Error generateSector={generateSector} />;
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
              rows: sector.rows,
              columns: sector.columns,
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
        <div className="SectorMap-Sidebar">{children}</div>
        <TopLevelEntityModal />
        <ProfileModal />
      </div>
    );
  }
}
