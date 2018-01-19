import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { delay } from 'lodash';

import { getTopLevelEntity } from 'utils/entity';
import Entities from 'constants/entities';

import './style.css';

let isMousedDown = false;
const hexPadding = 2;

function Hex({
  topLevelEntities,
  data,
  entityHoverStart,
  entityHoverEnd,
  entityHold,
  entityRelease,
  moveTopLevelEntity,
  topLevelEntityCreate,
  holdKey,
  hoverKey,
  isCloudSave,
  router,
}) {
  const { entity, entityId, entityType } = getTopLevelEntity(
    topLevelEntities,
    data.hexKey,
  );

  const onMouseDown = () => {
    isMousedDown = true;
    delay(() => {
      if (isMousedDown && !isCloudSave) {
        if (entity) {
          entityHold(data.hexKey);
        } else {
          topLevelEntityCreate(data.hexKey);
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
        entityRelease();
      } else if (holdKey) {
        moveTopLevelEntity();
      }
    }
  };

  const isInSector = func => {
    if (data.highlighted) {
      return () => func(data.hexKey);
    }
    return () => {};
  };

  const renderChildNum = () => {
    if (!entity || data.width <= 45) {
      return null;
    }
    return (
      <text
        className="Hex-Text Hex-Children"
        x={data.xOffset}
        y={data.yOffset - data.height / 2 + hexPadding}
      >
        {entity.numChildren}
      </text>
    );
  };

  const renderEntityIcon = () => {
    if (!entity) {
      return null;
    }
    if (entityType === Entities.blackHole.key) {
      return (
        <circle
          className="Hex-BlackHole"
          cx={data.xOffset}
          cy={data.yOffset}
          r={data.width / 13}
        />
      );
    }
    return (
      <circle
        className="Hex-System"
        cx={data.xOffset}
        cy={data.yOffset}
        r={data.width / 13}
      />
    );
  };

  const renderEntityName = () => {
    if (!entity || data.width <= 45) {
      return null;
    }
    return (
      <text className="Hex-Text Hex-Name" x={data.xOffset} y={data.yOffset}>
        {entity.name}
      </text>
    );
  };

  const renderEntityKey = () => {
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
      onMouseEnter={isInSector(entityHoverStart)}
      onMouseLeave={isInSector(entityHoverEnd)}
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
      {renderChildNum()}
      {renderEntityIcon()}
      {renderEntityName()}
      {renderEntityKey()}
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
  entityHoverStart: PropTypes.func.isRequired,
  entityHoverEnd: PropTypes.func.isRequired,
  entityHold: PropTypes.func.isRequired,
  entityRelease: PropTypes.func.isRequired,
  moveTopLevelEntity: PropTypes.func.isRequired,
  topLevelEntityCreate: PropTypes.func.isRequired,
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
