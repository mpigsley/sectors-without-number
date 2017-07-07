import React from 'react';
import PropTypes from 'prop-types';

export default function Hexagon(props) {
  const points = 6;
  const { xOffset, yOffset, highlighted, ...newProps } = props;
  const radius = props.width / 2;
  const hexagon = [];

  for (let i = 0; i < points; i += 1) {
    const pointOnCircle = (i * Math.PI) / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push(`${x + xOffset},${y + yOffset}`);
  }

  return <polygon {...newProps} points={hexagon.join(' ')} />;
}

Hexagon.propTypes = {
  width: PropTypes.number.isRequired,
  highlighted: PropTypes.bool.isRequired,
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
};

Hexagon.defaultProps = {
  xOffset: 0,
  yOffset: 0,
};
