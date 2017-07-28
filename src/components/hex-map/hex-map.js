import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import System from 'components/system';

import './style.css';

const HexContainer = styled.div`
  background-color: ${props => props.theme.dark3};
`;

export default function HexMap({
  height,
  width,
  hexData,
}) {
  return (
    <HexContainer>
      <svg className="HexMap-SVG" width={width} height={height}>
        {hexData.map(hex => <System {...hex} key={hex.systemKey} />)}
      </svg>
    </HexContainer>
  );
}

HexMap.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  hexData: PropTypes.arrayOf(PropTypes.shape({
    systemKey: PropTypes.string.isRequired,
  })).isRequired,
};
