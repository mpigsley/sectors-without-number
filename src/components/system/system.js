import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';

import './style.css';

function System(props) {
  const points = 6;
  const { data } = props;
  const radius = data.width / 2;
  const hexagon = [];

  for (let i = 0; i < points; i += 1) {
    const pointOnCircle = (i * Math.PI) / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push(`${x + data.xOffset},${y + data.yOffset}`);
  }

  const isSystem = (func) => {
    if (data.highlighted) {
      return () => func(props.systemKey);
    }
    return () => {};
  };

  const onClick = () => {
    if (data.system) {
      props.router.push(`/sector/system/${data.systemKey}${props.location.search}`);
    }
  };

  let star = null;
  if (data.system) {
    star = (
      <circle
        className="System-Circle"
        cx={data.xOffset}
        cy={data.yOffset}
        r={data.width / 13}
      />
    );
  }

  let planetNum = null;
  if (data.system && data.width > 45) {
    planetNum = (
      <text
        className="System-Text"
        x={data.xOffset}
        y={data.yOffset - ((data.height / 2) - 8)}
      >
        {Object.keys(data.system.planets).length}
      </text>
    );
  }

  let number = null;
  if (data.highlighted && data.width > 45) {
    number = (
      <text
        className="System-Text"
        x={data.xOffset}
        y={data.yOffset + ((data.height / 2) - 3)}
      >
        {data.systemKey}
      </text>
    );
  }

  return (
    <g
      className={classNames('System-Hex', {
        'System-Hex--hoverable': data.highlighted,
        'System-Hex--clickable': !!data.system,
      })}
      onMouseEnter={isSystem(props.sectorHoverStart)}
      onMouseLeave={isSystem(props.sectorHoverEnd)}
      onClick={onClick}
    >
      <polygon
        className={classNames('System-Polygon', {
          'System-Polygon--highlighted': data.highlighted,
        })}
        height={data.height}
        width={data.width}
        points={hexagon.join(' ')}
      />
      {planetNum}
      {star}
      {number}
    </g>
  );
}

System.propTypes = {
  data: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    highlighted: PropTypes.bool.isRequired,
    systemKey: PropTypes.string.isRequired,
    xOffset: PropTypes.number,
    yOffset: PropTypes.number,
    system: PropTypes.shape({
      key: PropTypes.string.isRequired,
    }),
  }).isRequired,
  sectorHoverStart: PropTypes.func.isRequired,
  sectorHoverEnd: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default withRouter(System);
