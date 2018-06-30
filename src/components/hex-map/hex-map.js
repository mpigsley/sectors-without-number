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
import hexCanvas, { getPixelRatio, getHoveredHex } from 'utils/hex/canvas';

import './style.css';

export default class HexMap extends Component {
  static propTypes = {
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

  static defaultProps = {
    height: null,
    width: null,
    isSector: false,
    hoverKey: null,
    holdKey: null,
    currentEntityType: Entities.sector.key,
    hexes: [],
    paintRegionId: null,
  };

  componentWillMount() {
    this.ratio = getPixelRatio();
    this.isMouseDown = false;
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
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
    const isOnNav = this.props.currentEntityType === Entities.navigation.key;
    if (!isOnNav) {
      return;
    }
    if (this.props.navigationSettings.isCreatingRoute) {
      this.props.completeRoute();
    } else {
      this.props.updateNavSettings('isCreatingRoute', true);
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

    return getHoveredHex({
      x: event.pageX - totalOffsetX,
      y: event.pageY - totalOffsetY,
      hexes: this.props.hexes,
    });
  };

  mouseDown = event => {
    if (event.nativeEvent.which === 3) {
      return; // right click
    }
    const hexKey = this.getHexFromEvent(event);
    this.isMousedDown = true;
    delay(() => {
      const isOnNav = this.props.currentEntityType === Entities.navigation.key;
      const isOnLayers = this.props.currentEntityType === Entities.layer.key;
      if (
        this.isMousedDown &&
        !this.props.isShared &&
        !this.props.mapLocked &&
        !isOnNav &&
        !isOnLayers
      ) {
        if (this.props.isSidebarEditActive) {
          this.props.deactivateSidebarEdit();
        }
        const { entity } = getTopLevelEntity(
          this.props.topLevelEntities,
          hexKey,
        );
        if (entity) {
          this.props.entityHold(hexKey);
        } else {
          this.props.topLevelEntityCreate(hexKey);
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
    const { entity, entityId } = getTopLevelEntity(
      this.props.topLevelEntities,
      hexKey,
    );
    const isOnNav = this.props.currentEntityType === Entities.navigation.key;
    if (this.props.paintRegionId) {
      this.props.toggleRegionAtHex(hexKey);
    } else if (
      hexKey &&
      isOnNav &&
      this.props.navigationSettings.isCreatingRoute
    ) {
      this.props.addRouteLocation(hexKey);
    } else if (!isOnNav) {
      if (entity && !this.props.holdKey) {
        if (this.props.isSidebarEditActive) {
          this.props.deactivateSidebarEdit();
        }
        const route = `/sector/${this.props.match.params.sector}/${
          entity.type
        }/${entityId}`;
        if (this.props.location.pathname !== route) {
          this.props.toEntity(entity.type, entityId);
        }
      } else if (!this.props.isShared && !this.props.mapLocked) {
        if (!hexKey || this.props.holdKey === this.props.hoverKey) {
          this.props.entityRelease();
        } else if (this.props.holdKey) {
          this.props.moveTopLevelEntity();
        }
      }
    }
  };

  mouseMove = event => {
    const hexKey = this.getHexFromEvent(event);
    if (
      (hexKey && hexKey !== this.props.hoverKey) ||
      (!hexKey && this.props.hoverKey)
    ) {
      this.props.entityHover(hexKey);
    }
  };

  mouseLeave = () => {
    if (this.props.holdKey || this.props.hoverKey) {
      this.props.clearMapKeys();
      this.isMouseDown = false;
    }
  };

  renderEmptyMessage() {
    if (this.props.hexes.length > 0) {
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
    if (!this.props.isSector) {
      return null;
    }
    return <FloatingToolbar />;
  }

  render() {
    return (
      <div className="HexMap-Container">
        {this.renderEmptyMessage()}
        {this.renderToolbar()}
        <canvas
          width={this.props.width * this.ratio}
          height={this.props.height * this.ratio}
          style={{
            width: this.props.width,
            height: this.props.height,
          }}
          ref={canvas => {
            this.canvas = canvas;
          }}
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
