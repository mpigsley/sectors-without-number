import React from 'react';
import PropTypes from 'prop-types';

import { getTopLevelEntity } from 'utils/entity';
import Entities from 'constants/entities';

import './style.css';

const hexPadding = 2;

export default function MapPrintable({ topLevelEntities, data }) {
  const { entity, entityType } = getTopLevelEntity(
    topLevelEntities,
    data.hexKey,
  );

  const renderChildNum = () => {
    if (!entity || data.width <= 45) {
      return null;
    }
    return (
      <text
        className="MapPrintable-Text MapPrintable-Children"
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
    return (
      <circle
        className={
          entityType === Entities.blackHole.key
            ? 'MapPrintable-BlackHole'
            : 'MapPrintable-System'
        }
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
      <text
        className="MapPrintable-Text MapPrintable-Name"
        x={data.xOffset}
        y={data.yOffset}
      >
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
        className="MapPrintable-Text MapPrintable-Key"
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
    const pointOnCircle = (i * Math.PI) / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push(`${x + data.xOffset},${y + data.yOffset}`);
  }

  return (
    <g>
      <polygon
        className="MapPrintable-Polygon"
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

MapPrintable.propTypes = {
  topLevelEntities: PropTypes.shape().isRequired,
  data: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    highlighted: PropTypes.bool.isRequired,
    hexKey: PropTypes.string.isRequired,
    xOffset: PropTypes.number,
    yOffset: PropTypes.number,
  }).isRequired,
};
