import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';
import ColorSwatch from 'primitives/other/color-swatch';
import { map, size } from 'constants/lodash';

import styles from './styles.module.scss';

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
        <FlexContainer direction="column" className={styles.regions}>
          {map(hexLayer, (layer, layerName) => (
            <FlexContainer
              key={layerName}
              direction="column"
              align="flexStart"
              className={styles.layer}
            >
              <b>{layerName}</b>
              {layer.map(({ name, color }) => (
                <FlexContainer key={name} align="center">
                  <ColorSwatch size={10} color={color} />
                  <span>{name}</span>
                </FlexContainer>
              ))}
            </FlexContainer>
          ))}
        </FlexContainer>
      );
    }
    return (
      <div
        key={system.hexKey}
        className={classNames(styles.tooltip, {
          [styles['tooltip--hovered']]: system.hexKey === hoverKey && !holdKey,
        })}
        style={{
          top: system.yOffset - system.height / 2 - 10,
          left: system.xOffset,
        }}
      >
        <div className={styles.text}>
          <FlexContainer direction="column" align="center">
            <FlexContainer align="flexEnd">
              <div className={styles.name}>{system.name}</div>
              <div className={styles.key}>({system.hexKey})</div>
            </FlexContainer>
            {hexLayerRegions}
          </FlexContainer>
        </div>
      </div>
    );
  };

  return hexes.filter(({ hexKey }) => hexKey).map(renderTooltip);
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
