import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import AbsoluteContainer from 'primitives/container/absolute-container';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';
import hexCanvas, { getPixelRatio } from 'utils/hex-canvas';

import './style.css';

export default class HexMap extends Component {
  componentWillMount() {
    this.ratio = getPixelRatio();
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    hexCanvas({
      ctx: this.ctx,
      ratio: this.ratio,
      hexes: this.props.hexes,
      entities: this.props.topLevelEntities,
    });
  }

  componentDidUpdate(nextProps) {
    hexCanvas({
      ctx: this.ctx,
      ratio: this.ratio,
      hexes: nextProps.hexes,
      entities: nextProps.topLevelEntities,
    });
  }

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

  render() {
    return (
      <div className="HexMap-Container">
        {this.renderEmptyMessage()}
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
        />
      </div>
    );
  }
}

HexMap.propTypes = {
  topLevelEntities: PropTypes.shape().isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  hexes: PropTypes.arrayOf(
    PropTypes.shape({
      hexKey: PropTypes.string.isRequired,
    }),
  ),
};

HexMap.defaultProps = {
  height: null,
  width: null,
  hexes: [],
};
