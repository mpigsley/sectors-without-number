import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip, TooltipText } from './components';

export default function SystemTooltips({
  hoverKey,
  systems,
}) {
  const renderTooltip = system => (
    <Tooltip
      hovered={system.key === hoverKey}
      key={system.key}
      style={{
        top: system.yOffset - (system.height / 2) - 10,
        left: system.xOffset,
      }}
    >
      <TooltipText>
        <b>Position: </b>{system.key}
        <br />
        <b>Sector: </b>{system.name}
      </TooltipText>
    </Tooltip>
  );

  return (
    <div>
      {systems.map(renderTooltip)}
    </div>
  );
}

SystemTooltips.propTypes = {
  hoverKey: PropTypes.string,
  systems: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    xOffset: PropTypes.number.isRequired,
    yOffset: PropTypes.number.isRequired,
  })).isRequired,
};

SystemTooltips.defaultProps = {
  hoverKey: null,
};
