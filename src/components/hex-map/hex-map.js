import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FlexContainerStyle } from 'primitives';
import System from 'components/system';

const HexContainer = styled.div`
  background-color: ${props => props.theme.dark3};
`;

const Svg = styled.svg`${FlexContainerStyle}`;

export default function HexMap({
  height,
  width,
  hexData,
}) {
  return (
    <HexContainer>
      <Svg width={width} height={height}>
        {hexData.map(hex => <System {...hex} key={hex.systemKey} />)}
      </Svg>
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
