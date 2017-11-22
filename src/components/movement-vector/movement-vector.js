import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const triangleEnd = 'triangle-end';
const triangleStart = 'triangle-start';

export const MarkerDefs = [
  <marker
    className="MovementVector-Marker"
    id={triangleEnd}
    key={triangleEnd}
    viewBox="0 0 10 10"
    refX="1"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto"
  >
    <path d="M 0 0 L 10 5 L 0 10 z" />
  </marker>,
  <marker
    className="MovementVector-Marker"
    id={triangleStart}
    key={triangleStart}
    viewBox="0 0 10 10"
    refX="1"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse"
  >
    <path d="M 0 0 L 10 5 L 0 10 z" />
  </marker>,
];

const offsetForSystem = 16;
const offsetForCenter = 10;

export default function MovementVector({ hoverKey, holdKey, hexes }) {
  const hovered = hexes.filter(hex => hex.hexKey === hoverKey)[0];
  const held = hexes.filter(hex => hex.hexKey === holdKey)[0];
  if (!hovered || !held || hoverKey === holdKey) {
    return null;
  }

  const isSwitch = !!hovered.system;
  const distanceBetween = Math.sqrt(
    (hovered.xOffset - held.xOffset) ** 2 +
      (hovered.yOffset - held.yOffset) ** 2,
  );
  const ratio =
    (isSwitch ? offsetForSystem : offsetForCenter) / distanceBetween;
  const xEnd = (1 - ratio) * hovered.xOffset + ratio * held.xOffset;
  const yEnd = (1 - ratio) * hovered.yOffset + ratio * held.yOffset;

  let xStart = held.xOffset;
  let yStart = held.yOffset;
  if (isSwitch) {
    xStart = (1 - ratio) * held.xOffset + ratio * hovered.xOffset;
    yStart = (1 - ratio) * held.yOffset + ratio * hovered.yOffset;
  }

  return (
    <line
      className="MovementVector"
      x1={xStart}
      y1={yStart}
      x2={xEnd}
      y2={yEnd}
      markerEnd={`url(#${triangleEnd})`}
      markerStart={isSwitch ? `url(#${triangleStart})` : undefined}
    />
  );
}

MovementVector.propTypes = {
  hoverKey: PropTypes.string,
  holdKey: PropTypes.string,
  hexes: PropTypes.arrayOf(
    PropTypes.shape({
      hexKey: PropTypes.string.isRequired,
    }),
  ),
};

MovementVector.defaultProps = {
  hoverKey: null,
  holdKey: null,
  hexes: [],
};
