import React from 'react';
import PropTypes from 'prop-types';

import NewLayer from './new-layer';

import './style.css';

export default function LayerSidebar({ layer }) {
  if (!layer) {
    return <NewLayer />;
  }
  return null;
}

LayerSidebar.propTypes = {
  layer: PropTypes.shape({}),
};

LayerSidebar.defaultProps = {
  layer: null,
};
