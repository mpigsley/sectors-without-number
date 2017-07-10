import React from 'react';
import PropTypes from 'prop-types';

import { Circle, Polygon, G } from './components';

export default function System(props) {
  const points = 6;
  const { system, xOffset, yOffset, ...newProps } = props;
  const isThisSystem = props.system && props.hoverKey === props.system.key;
  const radius = ((props.width) / 2) + (isThisSystem ? 3 : 0);
  const hexagon = [];

  for (let i = 0; i < points; i += 1) {
    const pointOnCircle = (i * Math.PI) / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push(`${x + xOffset},${y + yOffset}`);
  }

  let star = null;
  if (system) {
    star = <Circle cx={xOffset} cy={yOffset} r={newProps.width / 14} />;
  }

  const isSystem = (func) => {
    if (props.system) {
      return () => func(props.system.key);
    }
    return null;
  };

  return (
    <G
      hoverable={props.highlighted}
      onMouseEnter={isSystem(props.sectorHoverStart)}
      onMouseLeave={isSystem(props.sectorHoverEnd)}
    >
      <Polygon
        {...newProps}
        points={hexagon.join(' ')}
      />
      {star}
    </G>
  );
}

System.propTypes = {
  hoverKey: PropTypes.string,
  width: PropTypes.number.isRequired,
  highlighted: PropTypes.bool.isRequired,
  sectorHoverStart: PropTypes.func.isRequired,
  sectorHoverEnd: PropTypes.func.isRequired,
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  system: PropTypes.shape(),
};

System.defaultProps = {
  hoverKey: null,
  xOffset: 0,
  yOffset: 0,
  system: null,
};
