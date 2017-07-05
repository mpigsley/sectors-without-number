import styled from 'styled-components';

import {
  AbsoluteContainer,
  FlexContainer,
  FlexContainerStyle,
  Media,
  Button,
} from '../../primitives';
import Hexagon from '../hexagon';

export const HexContainer = styled.div`
  backgroundColor: ${props => props.theme.darkest};
  display: flex;
`;
export const Hex = styled(Hexagon)`
  fill: ${props => props.theme.darker};
`;
export const RowContainer = styled.div`
  flex: 1;
`;
export const Row = styled.hr`
  height: 1px;
  margin: 0 10%;
  border: none;
  background: ${props => props.left
    ? 'linear-gradient(to left, rgba(255, 255, 255, 0.8), transparent);'
    : 'linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent);'}
  ${Media.tablet`
    display: none;  
  `}
`;
export const ContentContainer = styled(AbsoluteContainer)`
  color: ${props => props.theme.lightest};
  ${FlexContainerStyle}
`;
export const SubContainer = styled(FlexContainer)`
  ${props => props.fullWidth ? 'width: calc(100% - 1rem)' : ''}
  margin: 0 1rem;
  text-align: center;
  flex-wrap
`;
export const HomeButton = styled(Button)`
  margin: 0.4rem 1rem;
`;
