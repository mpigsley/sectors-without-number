import styled from 'styled-components';

import {
  Media,
} from '../../primitives';

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
