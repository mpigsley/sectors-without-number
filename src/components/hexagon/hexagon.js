import React from 'react';
import PropTypes from 'prop-types';

import Circle from './components';

export default function Hexagon(props) {
  const points = 6;
  const { hasStar, xOffset, yOffset, highlighted, ...newProps } = props;
  const radius = props.width / 2;
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
    <g>
      <polygon {...newProps} points={hexagon.join(' ')} />
      {star}
    </g>
  );
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
