import React from 'react';
import PropTypes from 'prop-types';

export default function SectorInfo({
  name,
}) {
  return <div>{name}</div>;
}

SectorInfo.propTypes = {
  name: PropTypes.string.isRequired,
};
