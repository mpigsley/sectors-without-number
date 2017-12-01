import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { delay, findKey } from 'lodash';

import { coordinateKey } from 'utils/common';

import './style.css';

let isMousedDown = false;
const hexPadding = 2;

function Hex({
  topLevelEntities,
  data,
  systemHoverStart,
  systemHoverEnd,
  systemHold,
  systemRelease,
  holdKey,
  hoverKey,
  isCloudSave,
  router,
}) {
  const entityId = findKey(
    topLevelEntities,
    ({ x, y }) => coordinateKey(x, y) === data.hexKey,
  );
  const entity = topLevelEntities[entityId];

  const onMouseDown = () => {
    isMousedDown = true;
    delay(() => {
      if (isMousedDown && !isCloudSave) {
        if (data.entity) {
          systemHold(data.hexKey);
        } else {
          // open system create
        }
      }
    }, 100);
  };

  const onMouseUp = () => {
    isMousedDown = false;
    if (entity && !holdKey) {
      router.push(`/sector/${router.params.sector}/${entity.type}/${entityId}`);
    } else if (!isCloudSave) {
      if (!data.highlighted || holdKey === hoverKey) {
        systemRelease();
      } else if (!isCloudSave && holdKey) {
        // moveSystem();
      }
    }
  };

  const isInSector = func => {
    if (data.highlighted) {
      return () => func(data.hexKey);
    }
    return () => {};
  };

  const renderPlanetNum = () => {
    if (!entity || data.width <= 45) {
      return null;
    }
    return (
      <text
        className="Hex-Text Hex-Planets"
        x={data.xOffset}
        y={data.yOffset - data.height / 2 + hexPadding}
      >
        {entity.numChildren}
      </text>
    );
  };

  const renderStarCircle = () => {
    if (!entity) {
      return null;
    }
    return (
      <circle
        className="Hex-Circle"
        cx={data.xOffset}
        cy={data.yOffset}
        r={data.width / 13}
      />
    );
  };

  const renderSystemName = () => {
    if (!entity || data.width <= 45) {
      return null;
    }
    return (
      <text className="Hex-Text Hex-Name" x={data.xOffset} y={data.yOffset}>
        {entity.name}
      </text>
    );
  };

  const renderSystemKey = () => {
    if (!data.highlighted || data.width <= 45) {
      return null;
    }
    return (
      <text
        className="Hex-Text Hex-Key"
        x={data.xOffset}
        y={data.yOffset + data.height / 2 - hexPadding}
      >
        {data.hexKey}
      </text>
    );
  };

  const points = 6;
  const radius = data.width / 2;
  const hexagon = [];

  for (let i = 0; i < points; i += 1) {
    const pointOnCircle = i * Math.PI / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push(`${x + data.xOffset},${y + data.yOffset}`);
  }

  return (
    <g
      className={classNames('Hex', {
        'Hex--hoverable': data.highlighted,
        'Hex--clickable': !!entity,
        'Hex--drag': !!holdKey,
        'Hex--movable':
          holdKey === data.hexKey || (!!holdKey && hoverKey === data.hexKey),
      })}
      onMouseEnter={isInSector(systemHoverStart)}
      onMouseLeave={isInSector(systemHoverEnd)}
      onMouseDown={isInSector(onMouseDown)}
      onMouseUp={onMouseUp}
    >
      <polygon
        className={classNames('Hex-Polygon', {
          'Hex-Polygon--highlighted': data.highlighted,
        })}
        height={data.height}
        width={data.width}
        points={hexagon.join(' ')}
      />
      {renderPlanetNum()}
      {renderStarCircle()}
      {renderSystemName()}
      {renderSystemKey()}
    </g>
  );
}

Hex.propTypes = {
  topLevelEntities: PropTypes.shape().isRequired,
  data: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    highlighted: PropTypes.bool.isRequired,
    hexKey: PropTypes.string.isRequired,
    xOffset: PropTypes.number,
    yOffset: PropTypes.number,
  }).isRequired,
  systemHoverStart: PropTypes.func.isRequired,
  systemHoverEnd: PropTypes.func.isRequired,
  systemHold: PropTypes.func.isRequired,
  systemRelease: PropTypes.func.isRequired,
  holdKey: PropTypes.string,
  hoverKey: PropTypes.string,
  isCloudSave: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
    params: PropTypes.shape({
      sector: PropTypes.string,
    }),
  }).isRequired,
};

Hex.defaultProps = {
  holdKey: null,
  hoverKey: null,
};

export default withRouter(Hex);
