import React, { PropTypes } from 'react';

export default function Hexagon(props) {
  const points = 6;
  const { xOffset, yOffset, ...newProps } = props;
  const radius = (props.width - props.strokeWidth) / 2;
  const hexagon = [];

  for (let i = 0; i < points; i += 1) {
    const pointOnCircle = (i * Math.PI) / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push(`${x + xOffset},${y + yOffset}`);
  }

  return (
    <polygon
      {...newProps}
      points={hexagon.join(' ')}
    />
  );
}

Hexagon.propTypes = {
  width: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
};

Hexagon.defaultProps = {
  strokeWidth: 1,
  xOffset: 0,
  yOffset: 0,
};
