import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default function SectorSidebar({ children }) {
  return <div className="SectorSidebar">{children}</div>;
}

SectorSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
