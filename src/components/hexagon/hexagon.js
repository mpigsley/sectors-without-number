import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Circle, Polygon, G } from './components';

export default class Hexagon extends Component {
  state = {
    isHovered: false,
  }

  render() {
    const points = 6;
    const { hasStar, xOffset, yOffset, ...newProps } = this.props;
    const radius = ((this.props.width) / 2) + (this.state.isHovered ? 3 : 0);
    const hexagon = [];

    for (let i = 0; i < points; i += 1) {
      const pointOnCircle = (i * Math.PI) / 3;
      const x = radius * Math.cos(pointOnCircle);
      const y = radius * Math.sin(pointOnCircle);
      hexagon.push(`${x + xOffset},${y + yOffset}`);
    }

    let star = null;
    if (hasStar) {
      star = <Circle cx={xOffset} cy={yOffset} r={newProps.width / 14} />;
    }

    return (
      <G
        hoverable={this.props.highlighted}
        onMouseEnter={() => this.setState({ isHovered: this.props.highlighted })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <Polygon
          {...newProps}
          points={hexagon.join(' ')}
        />
        {star}
      </G>
    );
  }
}

Hexagon.propTypes = {
  width: PropTypes.number.isRequired,
  highlighted: PropTypes.bool.isRequired,
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  hasStar: PropTypes.bool.isRequired,
};

Hexagon.defaultProps = {
  xOffset: 0,
  yOffset: 0,
};
