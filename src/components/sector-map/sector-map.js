import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import EntityTooltips from 'components/entity-tooltips';
import CondensedPrintable from 'components/printables/condensed-printable';
import ExpandedPrintable from 'components/printables/expanded-printable';
import TopLevelEntityModal from 'components/top-level-entity-modal';
import ProfileModal from 'components/profile-modal';
import HexMap from 'components/hex-map';
import Navigation from 'components/navigation';

import ExportTypes from 'constants/export-types';
import { debounce, isEmpty, map } from 'constants/lodash';
import hexGenerator from 'utils/hex/generator';
import { coordinateKey } from 'utils/common';
import Loading from './loading';
import Error from './error';

import './style.css';

const calcNavWidth = () => (window.innerWidth > 1500 ? 200 : 75);
const calcWidth = () => {
  let width = window.innerWidth - 75;
  if (window.innerWidth > 1500) {
    width -= 575;
  } else if (window.innerWidth > 1200) {
    width -= 450;
  } else if (window.innerWidth > 700) {
    width -= 375;
  }
  return width;
};

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

  state = {
    height: window.innerHeight,
    width: calcWidth(),
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

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = debounce(() => {
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
        leftOffset={calcNavWidth()}
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

    const { hexes, printable } = hexGenerator({
      renderSector: true,
      height: this.state.height,
      width: this.state.width,
      rows: this.props.sector.rows,
      columns: this.props.sector.columns,
    });

    return (
      <Fragment>
        <FlexContainer className="SectorMap" direction="row">
          {this.renderTooltips(hexes)}
          <Navigation />
          <HexMap
            width={this.state.width}
            height={this.state.height}
            hexes={hexes}
            isSector
          />
          <div className="SectorMap-Sidebar">{this.props.children}</div>
        </FlexContainer>
        {this.renderPrintable(printable)}
        <TopLevelEntityModal />
        <ProfileModal />
      </Fragment>
    );
  }
}
