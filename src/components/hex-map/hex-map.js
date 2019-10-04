import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import AbsoluteContainer from 'primitives/container/absolute-container';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';
import FloatingToolbar from 'components/floating-toolbar';

import { delay } from 'constants/lodash';
import Entities from 'constants/entities';
import { getTopLevelEntity } from 'utils/entity';
import hexCanvas from 'utils/hex/canvas';
import { getPixelRatio, getHoveredHex } from 'utils/canvas-helpers';

import './style.scss';

export default class HexMap extends Component {
  constructor(props) {
    super(props);

    this.ratio = getPixelRatio();
    this.isMouseDown = false;
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
    hexCanvas({
      ctx: this.ctx,
      ratio: this.ratio,
      ...this.props,
    });
  }

  componentDidUpdate() {
    hexCanvas({
      ctx: this.ctx,
      ratio: this.ratio,
      ...this.props,
    });
  }

  onContextMenu = e => {
    e.preventDefault();
    const {
      currentEntityType,
      navigationSettings,
      completeRoute,
      updateNavSettings,
    } = this.props;
    const isOnNav = currentEntityType === Entities.navigation.key;
    if (!isOnNav) {
      return;
    }
    if (navigationSettings.isCreatingRoute) {
      completeRoute();
    } else {
      updateNavSettings('isCreatingRoute', true);
    }
  };

  getHexFromEvent = event => {
    let totalOffsetX = 0;
    let totalOffsetY = 0;
    let currentElement = event.target;

    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
      totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      currentElement = currentElement.offsetParent;
    } while (currentElement);

    const { hexes } = this.props;
    return getHoveredHex({
      x: event.pageX - totalOffsetX,
      y: event.pageY - totalOffsetY,
      hexes,
    });
  };

  mouseDown = event => {
    if (event.nativeEvent.which === 3) {
      return; // right click
    }
    const hexKey = this.getHexFromEvent(event);
    this.isMousedDown = true;
    delay(() => {
      const {
        currentEntityType,
        isShared,
        mapLocked,
        isSidebarEditActive,
        deactivateSidebarEdit,
        topLevelEntities,
        entityHold,
        topLevelEntityCreate,
      } = this.props;
      const isOnNav = currentEntityType === Entities.navigation.key;
      const isOnLayers = currentEntityType === Entities.layer.key;
      if (
        this.isMousedDown &&
        !isShared &&
        !mapLocked &&
        !isOnNav &&
        !isOnLayers
      ) {
        if (isSidebarEditActive) {
          deactivateSidebarEdit();
        }
        const { entity } = getTopLevelEntity(topLevelEntities, hexKey);
        if (entity) {
          entityHold(hexKey);
        } else {
          topLevelEntityCreate(hexKey);
        }
      }
    }, 600);
  };

  mouseUp = event => {
    this.isMousedDown = false;
    if (event.nativeEvent.which === 3) {
      return; // right click
    }
    const hexKey = this.getHexFromEvent(event);
    const {
      currentEntityType,
      isShared,
      holdKey,
      hoverKey,
      mapLocked,
      isSidebarEditActive,
      deactivateSidebarEdit,
      topLevelEntities,
      paintRegionId,
      toggleRegionAtHex,
      navigationSettings,
      addRouteLocation,
      match,
      location,
      toEntity,
      entityRelease,
      moveTopLevelEntity,
    } = this.props;
    const { entity, entityId } = getTopLevelEntity(topLevelEntities, hexKey);
    const isOnNav = currentEntityType === Entities.navigation.key;
    if (paintRegionId) {
      toggleRegionAtHex(hexKey);
    } else if (hexKey && isOnNav && navigationSettings.isCreatingRoute) {
      addRouteLocation(hexKey);
    } else if (!isOnNav) {
      if (entity && !holdKey) {
        if (isSidebarEditActive) {
          deactivateSidebarEdit();
        }
        const route = `/sector/${match.params.sector}/${entity.type}/${entityId}`;
        if (location.pathname !== route) {
          toEntity(entity.type, entityId);
        }
      } else if (!isShared && !mapLocked) {
        if (!hexKey || holdKey === hoverKey) {
          entityRelease();
        } else if (holdKey) {
          moveTopLevelEntity();
        }
      }
    }
  };

  mouseMove = event => {
    const { hoverKey, entityHover } = this.props;
    const hexKey = this.getHexFromEvent(event);
    if ((hexKey && hexKey !== hoverKey) || (!hexKey && hoverKey)) {
      entityHover(hexKey);
    }
  };

  mouseLeave = () => {
    const { hoverKey, holdKey, clearMapKeys } = this.props;
    if (holdKey || hoverKey) {
      clearMapKeys();
      this.isMouseDown = false;
    }
  };

  renderEmptyMessage() {
    const { hexes } = this.props;
    if (hexes.length > 0) {
      return null;
    }
    return (
      <AbsoluteContainer>
        <ContentContainer direction="column" align="center" justify="center">
          <SubContainer className="HexMap-Message">
            <FormattedMessage id="misc.windowTooSmall" />
          </SubContainer>
        </ContentContainer>
      </AbsoluteContainer>
    );
  }

  renderToolbar() {
    const { isSector } = this.props;
    if (!isSector) {
      return null;
    }
    return <FloatingToolbar />;
  }

  render() {
    const { width, height } = this.props;
    return (
      <div className="HexMap-Container">
        {this.renderEmptyMessage()}
        {this.renderToolbar()}
        <canvas
          id="hex-map"
          width={width * this.ratio}
          height={height * this.ratio}
          style={{ width, height }}
          ref={this.canvas}
          onMouseMove={this.mouseMove}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onMouseLeave={this.mouseLeave}
          onContextMenu={this.onContextMenu}
        />
      </div>
    );
  }
}

HexMap.propTypes = {
  entityHover: PropTypes.func.isRequired,
  entityHold: PropTypes.func.isRequired,
  entityRelease: PropTypes.func.isRequired,
  moveTopLevelEntity: PropTypes.func.isRequired,
  topLevelEntityCreate: PropTypes.func.isRequired,
  deactivateSidebarEdit: PropTypes.func.isRequired,
  clearMapKeys: PropTypes.func.isRequired,
  addRouteLocation: PropTypes.func.isRequired,
  completeRoute: PropTypes.func.isRequired,
  updateNavSettings: PropTypes.func.isRequired,
  toggleRegionAtHex: PropTypes.func.isRequired,
  toEntity: PropTypes.func.isRequired,
  topLevelEntities: PropTypes.shape().isRequired,
  isShared: PropTypes.bool.isRequired,
  isSidebarEditActive: PropTypes.bool.isRequired,
  isSector: PropTypes.bool,
  mapLocked: PropTypes.bool.isRequired,
  hoverKey: PropTypes.string,
  holdKey: PropTypes.string,
  currentEntityType: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  hexes: PropTypes.arrayOf(
    PropTypes.shape({
      hexKey: PropTypes.string.isRequired,
    }),
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      sector: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  navigationSettings: PropTypes.shape({
    isCreatingRoute: PropTypes.bool.isRequired,
  }).isRequired,
  paintRegionId: PropTypes.string,
};

HexMap.defaultProps = {
  height: null,
  width: null,
  isSector: false,
  hoverKey: null,
  holdKey: null,
  currentEntityType: Entities.sector.key,
  hexes: [],
  paintRegionId: null,
};
