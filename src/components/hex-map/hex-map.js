import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import System from 'components/system';
import MovementVector, { MarkerDefs } from 'components/movement-vector';

import './style.css';

export default function HexMap({ height, width, viewbox, holdKey, hexes }) {
  return (
    <div className="HexMap-Container">
      <svg
        className={classNames('HexMap-SVG', {
          'HexMap-SVG--drag': !!holdKey,
        })}
        width={width}
        height={height}
        viewBox={viewbox}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>{MarkerDefs}</defs>
        {hexes.map(hex => <System data={hex} key={hex.systemKey} />)}
        <MovementVector hexes={hexes} />
      </svg>
    </div>
  );
}

HexMap.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  viewbox: PropTypes.string,
  holdKey: PropTypes.string,
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
  holdKey: null,
  hexes: [],
};
