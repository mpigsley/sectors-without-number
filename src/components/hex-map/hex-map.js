import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { delay } from 'lodash';

import AbsoluteContainer from 'primitives/container/absolute-container';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';
import FloatingToolbar from 'components/floating-toolbar';

import { getTopLevelEntity } from 'utils/entity';
import hexCanvas, { getPixelRatio, getHoveredHex } from 'utils/hex/canvas';

import './style.css';

class HexMap extends Component {
  static propTypes = {
    entityHover: PropTypes.func.isRequired,
    entityHold: PropTypes.func.isRequired,
    entityRelease: PropTypes.func.isRequired,
    moveTopLevelEntity: PropTypes.func.isRequired,
    topLevelEntityCreate: PropTypes.func.isRequired,
    deactivateSidebarEdit: PropTypes.func.isRequired,
    clearMapKeys: PropTypes.func.isRequired,
    topLevelEntities: PropTypes.shape().isRequired,
    isShare: PropTypes.bool.isRequired,
    isSidebarEditActive: PropTypes.bool.isRequired,
    isSector: PropTypes.bool,
    hoverKey: PropTypes.string,
    holdKey: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    hexes: PropTypes.arrayOf(
      PropTypes.shape({
        hexKey: PropTypes.string.isRequired,
      }),
    ),
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      params: PropTypes.shape({
        sector: PropTypes.string,
      }),
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    height: null,
    width: null,
    isSector: false,
    hoverKey: null,
    holdKey: null,
    hexes: [],
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
    const hexKey = this.getHexFromEvent(event);
    this.isMousedDown = true;
    delay(() => {
      if (this.isMousedDown && !this.props.isShare) {
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
    const hexKey = this.getHexFromEvent(event);
    const { entity, entityId } = getTopLevelEntity(
      this.props.topLevelEntities,
      hexKey,
    );
    if (entity && !this.props.holdKey) {
      if (this.props.isSidebarEditActive) {
        this.props.deactivateSidebarEdit();
      }
      const route = `/sector/${this.props.router.params.sector}/${
        entity.type
      }/${entityId}`;
      if (this.props.location.pathname !== route) {
        this.props.router.push(route);
      }
    } else if (!this.props.isShare) {
      if (!hexKey || this.props.holdKey === this.props.hoverKey) {
        this.props.entityRelease();
      } else if (this.props.holdKey) {
        this.props.moveTopLevelEntity();
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
        />
      </div>
    );
  }
}

export default withRouter(HexMap);
