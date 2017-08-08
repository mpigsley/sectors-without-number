import React from 'react';
import PropTypes from 'prop-types';

import System from 'components/system';

import './style.css';

export default function HexMap({ height, width, viewbox, hexes }) {
  return (
    <div className="HexMap-Container">
      <svg
        className="HexMap-SVG"
        width={width}
        height={height}
        viewBox={viewbox}
        preserveAspectRation="xMidYMid meet"
      >
        {hexes.map(hex => <System data={hex} key={hex.systemKey} />)}
      </svg>
    </div>
  );
}

HexMap.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  viewbox: PropTypes.string,
  hexes: PropTypes.arrayOf(
    PropTypes.shape({
      systemKey: PropTypes.string.isRequired,
    }),
  ),
};

HexMap.defaultProps = {
  height: null,
  width: null,
  viewbox: null,
  hexes: [],
};
