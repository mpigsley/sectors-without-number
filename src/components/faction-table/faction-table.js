import React from 'react';
import PropTypes from 'prop-types';

export default function FactionTable({ children }) {
  return (
    <div>
      <h1>Faction Table</h1>
      {children}
    </div>
  );
}

FactionTable.propTypes = {
  children: PropTypes.node.isRequired,
};
