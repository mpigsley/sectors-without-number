import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function SystemTooltips({ hoverKey, systems }) {
  const renderTooltip = system =>
    <div
      className={classNames('SystemTooltips-Tooltip', {
        'SystemTooltips-Tooltip--hovered': system.key === hoverKey,
      })}
      key={system.key}
      style={{
        top: system.yOffset - system.height / 2 - 10,
        left: system.xOffset,
      }}
    >
      <div className="SystemTooltips-Text">
        <div className="SystemTooltips-Name">
          {system.name}
        </div>
        <div className="SystemTooltips-Key">
          ({system.key})
        </div>
      </div>
    </div>;

  return (
    <div>
      {systems.map(renderTooltip)}
    </div>
  );
}

SystemTooltips.propTypes = {
  hoverKey: PropTypes.string,
  systems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      xOffset: PropTypes.number.isRequired,
      yOffset: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

SystemTooltips.defaultProps = {
  hoverKey: null,
};
