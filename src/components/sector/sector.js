import React from 'react';
import PropTypes from 'prop-types';

export default function Sector({ rows, columns }) {
  return <h1>Sector ({rows}, {columns})</h1>;
}

Sector.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
};
