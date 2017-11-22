import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function EntityTooltips({ hoverKey, holdKey, entities }) {
  const renderTooltip = system => (
    <div
      className={classNames('EntityTooltips-Tooltip', {
        'EntityTooltips-Tooltip--hovered': system.key === hoverKey && !holdKey,
      })}
      key={system.key}
      style={{
        top: system.yOffset - system.height / 2 - 10,
        left: system.xOffset,
      }}
    >
      <div className="EntityTooltips-Text">
        <div className="EntityTooltips-Name">{system.name}</div>
        <div className="EntityTooltips-Key">({system.key})</div>
      </div>
    </div>
  );

  return <div>{entities.map(renderTooltip)}</div>;
}

EntityTooltips.propTypes = {
  hoverKey: PropTypes.string,
  holdKey: PropTypes.string,
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      xOffset: PropTypes.number.isRequired,
      yOffset: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

EntityTooltips.defaultProps = {
  hoverKey: null,
  holdKey: null,
};
