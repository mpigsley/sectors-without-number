import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tooltip = styled.div`
  pointer-events: none;
  position: fixed;
  opacity: ${props => (props.hovered ? 1 : 0)};
  transition: opacity 0.5s;
`;

const TooltipText = styled.div`
  background-color: ${props => props.theme.light4};
  padding: 1rem;
  border-radius: 6px;
  transform: translateX(-50%) translateY(-100%);
  z-index: 1;

  &::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-top-color: ${props => props.theme.light4};
  }
`;

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
