import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';
import { map } from 'constants/lodash';

import './style.css';

export default function EntityTooltips({
  hoverKey,
  holdKey,
  layer,
  hexes,
  leftOffset,
}) {
  const renderTooltip = system => {
    let hexLayerRegions;
    const hexLayer = (layer.hexes || {})[system.hexKey];
    if (((hexLayer || {}).regions || []).length) {
      const regionNames = map(
        hexLayer.regions,
        region => layer.regions[region].name,
      ).join(', ');
      hexLayerRegions = (
        <span className="EntityTooltips-Regions">
          <b>{layer.name}:</b> {regionNames}
        </span>
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
          left: system.xOffset + leftOffset,
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
  layer: PropTypes.shape({
    name: PropTypes.string,
    hexes: PropTypes.shape(),
    regions: PropTypes.shape(),
  }).isRequired,
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
