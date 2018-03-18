import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function EntityTooltips({
  hoverKey,
  holdKey,
  hexes,
  leftOffset,
}) {
  const renderTooltip = system => (
    <div
      className={classNames('EntityTooltips-Tooltip', {
        'EntityTooltips-Tooltip--hovered':
          system.hexKey === hoverKey && !holdKey,
      })}
      key={system.hexKey}
      style={{
        top: system.yOffset - system.height / 2 - 10,
        left: system.xOffset + leftOffset,
      }}
    >
      <div className="EntityTooltips-Text">
        <div className="EntityTooltips-Name">{system.name}</div>
        <div className="EntityTooltips-Key">({system.hexKey})</div>
      </div>
    </div>
  );

  return <div>{hexes.map(renderTooltip)}</div>;
}

EntityTooltips.propTypes = {
  hoverKey: PropTypes.string,
  holdKey: PropTypes.string,
  leftOffset: PropTypes.number,
  hexes: PropTypes.arrayOf(
    PropTypes.shape({
      hexKey: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      xOffset: PropTypes.number.isRequired,
      yOffset: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

EntityTooltips.defaultProps = {
  hoverKey: null,
  holdKey: null,
  leftOffset: 0,
};
