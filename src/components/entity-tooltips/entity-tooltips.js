import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';
import { map, size } from 'constants/lodash';

import './style.scss';

export default function EntityTooltips({
  hoverKey,
  holdKey,
  hexLayerNames,
  hexes,
}) {
  const renderTooltip = system => {
    let hexLayerRegions;
    const hexLayer = hexLayerNames[system.hexKey];
    if (size(hexLayer)) {
      hexLayerRegions = (
        <FlexContainer direction="column" className="EntityTooltips-Regions">
          {map(hexLayer, (names, layerName) => (
            <span key={layerName}>
              <b>{layerName}:</b> {names.join(', ')}
            </span>
          ))}
        </FlexContainer>
      );
    }
    return (
      <div
        key={system.hexKey}
        className={classNames('EntityTooltips-Tooltip', {
          'EntityTooltips-Tooltip--hovered':
            system.hexKey === hoverKey && !holdKey,
        })}
        style={{
          top: system.yOffset - system.height / 2 - 10,
          left: system.xOffset,
        }}
      >
        <div className="EntityTooltips-Text">
          <FlexContainer direction="column" align="center">
            <FlexContainer align="flexEnd">
              <div className="EntityTooltips-Name">{system.name}</div>
              <div className="EntityTooltips-Key">({system.hexKey})</div>
            </FlexContainer>
            {hexLayerRegions}
          </FlexContainer>
        </div>
      </div>
    );
  };

  return <>{hexes.filter(({ hexKey }) => hexKey).map(renderTooltip)}</>;
}

EntityTooltips.propTypes = {
  hoverKey: PropTypes.string,
  holdKey: PropTypes.string,
  hexLayerNames: PropTypes.shape().isRequired,
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
};
