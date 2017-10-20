import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { delay } from 'lodash';

import './style.css';

let isMousedDown = false;
const hexPadding = 2;

function System(props) {
  const systemHold = props.systemHold;
  const openSystemCreate = props.openSystemCreate;

  const onMouseDown = () => {
    isMousedDown = true;
    delay(() => {
      if (isMousedDown) {
        if (props.data.system) {
          systemHold(props.data.systemKey);
        } else {
          openSystemCreate(props.data.systemKey);
        }
      }
    }, 100);
  };

  const onMouseUp = () => {
    isMousedDown = false;
    if (props.data.system && !props.holdKey) {
      props.router.push(
        `/sector/${props.router.params.sector}/system/${props.data
          .systemKey}${props.location.search}`,
      );
    } else if (!props.data.highlighted || props.holdKey === props.hoverKey) {
      props.systemRelease();
    } else if (props.holdKey) {
      props.moveSystem();
    }
  };

  const isInSector = func => {
    if (props.data.highlighted) {
      return () => func(props.data.systemKey);
    }
    return () => {};
  };

  const renderPlanetNum = () => {
    if (!props.data.system || props.data.width <= 45) {
      return null;
    }
    return (
      <text
        className="System-Text System-Planets"
        x={props.data.xOffset}
        y={props.data.yOffset - props.data.height / 2 + hexPadding}
      >
        {Object.keys(props.data.system.planets).length}
      </text>
    );
  };

  const renderStarCircle = () => {
    if (!props.data.system) {
      return null;
    }
    return (
      <circle
        className="System-Circle"
        cx={props.data.xOffset}
        cy={props.data.yOffset}
        r={props.data.width / 13}
      />
    );
  };

  const renderSystemName = () => {
    if (!props.data.system || props.data.width <= 45) {
      return null;
    }
    return (
      <text
        className="System-Text System-Name"
        x={props.data.xOffset}
        y={props.data.yOffset}
      >
        {props.data.system.name}
      </text>
    );
  };

  const renderSystemKey = () => {
    if (!props.data.highlighted || props.data.width <= 45) {
      return null;
    }
    return (
      <text
        className="System-Text System-Key"
        x={props.data.xOffset}
        y={props.data.yOffset + props.data.height / 2 - hexPadding}
      >
        {props.data.systemKey}
      </text>
    );
  };

  const points = 6;
  const radius = props.data.width / 2;
  const hexagon = [];

  for (let i = 0; i < points; i += 1) {
    const pointOnCircle = i * Math.PI / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push(`${x + props.data.xOffset},${y + props.data.yOffset}`);
  }

  return (
    <g
      className={classNames('System-Hex', {
        'System-Hex--hoverable': props.data.highlighted,
        'System-Hex--clickable': !!props.data.system,
        'System-Hex--drag': !!props.holdKey,
        'System-Hex--movable':
          props.holdKey === props.data.systemKey ||
          (!!props.holdKey && props.hoverKey === props.data.systemKey),
      })}
      onMouseEnter={isInSector(props.systemHoverStart)}
      onMouseLeave={isInSector(props.systemHoverEnd)}
      onMouseDown={isInSector(onMouseDown)}
      onMouseUp={onMouseUp}
    >
      <polygon
        className={classNames('System-Polygon', {
          'System-Polygon--highlighted': props.data.highlighted,
        })}
        height={props.data.height}
        width={props.data.width}
        points={hexagon.join(' ')}
      />
      {renderPlanetNum()}
      {renderStarCircle()}
      {renderSystemName()}
      {renderSystemKey()}
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
      name: PropTypes.string.isRequired,
      planets: PropTypes.shape().isRequired,
    }),
  }).isRequired,
  systemHoverStart: PropTypes.func.isRequired,
  systemHoverEnd: PropTypes.func.isRequired,
  systemHold: PropTypes.func.isRequired,
  systemRelease: PropTypes.func.isRequired,
  moveSystem: PropTypes.func.isRequired,
  openSystemCreate: PropTypes.func.isRequired,
  holdKey: PropTypes.string,
  hoverKey: PropTypes.string,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
    params: PropTypes.shape({
      sector: PropTypes.string,
    }),
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
