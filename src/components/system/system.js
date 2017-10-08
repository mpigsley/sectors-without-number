import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { delay } from 'lodash';

import { coordinatesFromKey } from 'utils/common';
import NewSystemModal from './new-system-modal';

import './style.css';

const hexPadding = 2;

class System extends Component {
  static propTypes = {
    data: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      highlighted: PropTypes.bool.isRequired,
      systemKey: PropTypes.string.isRequired,
      xOffset: PropTypes.number,
      yOffset: PropTypes.number,
      system: PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        planets: PropTypes.shape().isRequired,
      }),
    }).isRequired,
    systemHoverStart: PropTypes.func.isRequired,
    systemHoverEnd: PropTypes.func.isRequired,
    systemHold: PropTypes.func.isRequired,
    systemRelease: PropTypes.func.isRequired,
    moveSystem: PropTypes.func.isRequired,
    holdKey: PropTypes.string,
    hoverKey: PropTypes.string,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    holdKey: null,
    hoverKey: null,
  };

  constructor(props) {
    super(props);

    this.isMousedDown = false;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  state = {
    isAddingSystem: false,
  };

  onMouseDown() {
    this.isMousedDown = true;
    const systemHold = this.props.systemHold;
    delay(() => {
      if (this.isMousedDown) {
        if (this.props.data.system) {
          systemHold(this.props.data.systemKey);
        } else {
          this.setState({ isAddingSystem: true });
        }
      }
    }, 200);
  }

  onMouseUp() {
    this.isMousedDown = false;
    if (this.props.data.system && !this.props.holdKey) {
      this.props.router.push(
        `/sector/system/${this.props.data.systemKey}${this.props.location
          .search}`,
      );
    } else if (
      !this.props.data.highlighted ||
      this.props.holdKey === this.props.hoverKey
    ) {
      this.props.systemRelease();
    } else if (this.props.holdKey) {
      this.props.moveSystem();
    }
  }

  isInSector(func) {
    if (this.props.data.highlighted) {
      return () => func(this.props.data.systemKey);
    }
    return () => {};
  }

  renderPlanetNum() {
    if (!this.props.data.system || this.props.data.width <= 45) {
      return null;
    }
    return (
      <text
        className="System-Text System-Planets"
        x={this.props.data.xOffset}
        y={this.props.data.yOffset - this.props.data.height / 2 + hexPadding}
      >
        {Object.keys(this.props.data.system.planets).length}
      </text>
    );
  }

  renderStarCircle() {
    if (!this.props.data.system) {
      return null;
    }
    return (
      <circle
        className="System-Circle"
        cx={this.props.data.xOffset}
        cy={this.props.data.yOffset}
        r={this.props.data.width / 13}
      />
    );
  }

  renderSystemName() {
    if (!this.props.data.system || this.props.data.width <= 45) {
      return null;
    }
    return (
      <text
        className="System-Text System-Name"
        x={this.props.data.xOffset}
        y={this.props.data.yOffset}
      >
        {this.props.data.system.name}
      </text>
    );
  }

  renderSystemKey() {
    if (!this.props.data.highlighted || this.props.data.width <= 45) {
      return null;
    }
    return (
      <text
        className="System-Text System-Key"
        x={this.props.data.xOffset}
        y={this.props.data.yOffset + this.props.data.height / 2 - hexPadding}
      >
        {this.props.data.systemKey}
      </text>
    );
  }

  renderNewSystemModal() {
    return (
      <NewSystemModal
        {...coordinatesFromKey(this.props.data.systemKey)}
        isOpen={this.state.isAddingSystem}
        onCreateSystem={system => {
          this.setState({ isAddingSystem: false });
        }}
        onClose={() => {
          this.setState({ isAddingSystem: false });
        }}
      />
    );
  }

  render() {
    const points = 6;
    const radius = this.props.data.width / 2;
    const hexagon = [];

    for (let i = 0; i < points; i += 1) {
      const pointOnCircle = i * Math.PI / 3;
      const x = radius * Math.cos(pointOnCircle);
      const y = radius * Math.sin(pointOnCircle);
      hexagon.push(
        `${x + this.props.data.xOffset},${y + this.props.data.yOffset}`,
      );
    }

    return (
      <g
        className={classNames('System-Hex', {
          'System-Hex--hoverable': this.props.data.highlighted,
          'System-Hex--clickable': !!this.props.data.system,
          'System-Hex--drag': !!this.props.holdKey,
          'System-Hex--movable':
            this.props.holdKey === this.props.data.systemKey ||
            (!!this.props.holdKey &&
              this.props.hoverKey === this.props.data.systemKey),
        })}
        onMouseEnter={this.isInSector(this.props.systemHoverStart)}
        onMouseLeave={this.isInSector(this.props.systemHoverEnd)}
        onMouseDown={this.isInSector(this.onMouseDown)}
        onMouseUp={this.onMouseUp}
      >
        <polygon
          className={classNames('System-Polygon', {
            'System-Polygon--highlighted': this.props.data.highlighted,
          })}
          height={this.props.data.height}
          width={this.props.data.width}
          points={hexagon.join(' ')}
        />
        {this.renderPlanetNum()}
        {this.renderStarCircle()}
        {this.renderSystemName()}
        {this.renderSystemKey()}
        {this.renderNewSystemModal()}
      </g>
    );
  }
}

export default withRouter(System);
