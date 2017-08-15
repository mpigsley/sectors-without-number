import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { delay } from 'lodash';

import './style.css';

let isMousedDown = false;

function System(props) {
  const points = 6;
  const { data } = props;
  const radius = data.width / 2;
  const hexagon = [];

  for (let i = 0; i < points; i += 1) {
    const pointOnCircle = i * Math.PI / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push(`${x + data.xOffset},${y + data.yOffset}`);
  }

  const isInSector = func => {
    if (data.highlighted) {
      return () => func(data.systemKey);
    }
    return () => {};
  };

  const isSystem = func => {
    if (data.system) {
      return () => func(data.systemKey);
    }
    return () => {};
  };

  const onMouseDown = () => {
    isMousedDown = true;
    const systemHold = props.systemHold;
    delay(() => {
      if (isMousedDown) {
        systemHold(data.systemKey);
      }
    }, 100);
  };

  const onMouseUp = () => {
    isMousedDown = false;
    if (data.system && !props.holdKey) {
      props.router.push(
        `/sector/system/${data.systemKey}${props.location.search}`,
      );
    } else if (!data.highlighted || props.holdKey === props.hoverKey) {
      props.systemRelease();
    } else if (props.holdKey) {
      props.moveSystem();
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
        className="System-Text System-Planets"
        x={data.xOffset}
        y={data.yOffset - data.height / 2}
      >
        {Object.keys(data.system.planets).length}
      </text>
    );
  }

  let name = null;
  if (data.system && data.width > 45) {
    name = (
      <text
        className="System-Text System-Name"
        x={data.xOffset}
        y={data.yOffset}
      >
        {data.system.name}
      </text>
    );
  }

  let number = null;
  if (data.highlighted && data.width > 45) {
    number = (
      <text
        className="System-Text System-Key"
        x={data.xOffset}
        y={data.yOffset + data.height / 2}
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
        'System-Hex--drag': !!props.holdKey,
        'System-Hex--movable':
          props.holdKey === data.systemKey ||
          (!!props.holdKey && props.hoverKey === data.systemKey),
      })}
      onMouseEnter={isInSector(props.sectorHoverStart)}
      onMouseLeave={isInSector(props.sectorHoverEnd)}
      onMouseDown={isSystem(onMouseDown)}
      onMouseUp={onMouseUp}
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
      {name}
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

System.defaultProps = {
  holdKey: null,
  hoverKey: null,
};

export default withRouter(System);
