import React from 'react';
import PropTypes from 'prop-types';

import HexMap from 'components/hex-map';

import './style.css';

export default function ExpandedPrintable({ printable }) {
  return (
    <div className="ExpandedPrintable">
      <div className="ExpandedPrintable-Container">
        <HexMap hexes={printable.hexes} viewbox={printable.viewbox} />
      </div>
      <div className="ExpandedPrintable-EntityContainer" />
    </div>
  );
}

ExpandedPrintable.propTypes = {
  // entities: PropTypes.shape().isRequired,
  printable: PropTypes.shape({
    hexes: PropTypes.arrayOf(PropTypes.object).isRequired,
    viewbox: PropTypes.string.isRequired,
  }).isRequired,
};
