import React from 'react';
import PropTypes from 'prop-types';

export default function SectorSidebar({ children }) {
  if (window.innerWidth <= 700) {
    return null;
  }
  return <div className="SectorSidebar">{children}</div>;
}

SectorSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
