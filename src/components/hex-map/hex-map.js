import React from 'react';
import PropTypes from 'prop-types';

import System from 'components/system';

import './style.css';

export default function HexMap({
  height,
  width,
  hexData,
}) {
  return (
    <div className="HexMap-Container">
      <svg className="HexMap-SVG" width={width} height={height}>
        {hexData.map(hex => <System data={hex} key={hex.systemKey} />)}
      </svg>
    </div>
  );
}

HexMap.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  hexData: PropTypes.arrayOf(PropTypes.shape({
    systemKey: PropTypes.string.isRequired,
  })).isRequired,
};
