import React, { Fragment } from 'react';
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

  return (
    <Fragment>
      {hexes.filter(({ hexKey }) => hexKey).map(renderTooltip)}
    </Fragment>
  );
}

EntityTooltips.propTypes = {
  hoverKey: PropTypes.string,
  holdKey: PropTypes.string,
  leftOffset: PropTypes.number,
  hexes: PropTypes.arrayOf(
    PropTypes.shape({
      hexKey: PropTypes.string,
      name: PropTypes.string.isRequired,
      xOffset: PropTypes.number,
      yOffset: PropTypes.number,
      height: PropTypes.number,
    }),
  ).isRequired,
};

EntityTooltips.defaultProps = {
  hoverKey: null,
  holdKey: null,
  leftOffset: 0,
};
