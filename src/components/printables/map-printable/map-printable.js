import React from 'react';
import PropTypes from 'prop-types';

import MapHex from './map-hex';
import './style.scss';

export default function MapPrintable({ viewbox, hexes, topLevelEntities }) {
  return (
    <div className="MapPrintable-Container">
      <svg
        className="MapPrintable-SVG"
        viewBox={viewbox}
        preserveAspectRatio="xMidYMid meet"
      >
        {hexes.map((hex) => (
          <MapHex
            data={hex}
            key={hex.hexKey}
            topLevelEntities={topLevelEntities}
          />
        ))}
      </svg>
    </div>
  );
}

MapPrintable.propTypes = {
  viewbox: PropTypes.string,
  topLevelEntities: PropTypes.shape().isRequired,
  hexes: PropTypes.arrayOf(
    PropTypes.shape({
      hexKey: PropTypes.string.isRequired,
    }),
  ),
};

MapPrintable.defaultProps = {
  viewbox: null,
  hexes: [],
};
