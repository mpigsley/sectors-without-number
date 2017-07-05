import styled from 'styled-components';

import Hexagon from '../hexagon';

export const HexContainer = styled.div`
  backgroundColor: ${props => props.theme.darkest};
  display: flex;
`;
export const Hex = styled(Hexagon)`
  fill: ${props => props.theme.darker};
`;
