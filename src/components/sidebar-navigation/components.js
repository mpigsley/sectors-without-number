import styled from 'styled-components';

import { FlexContainer } from 'primitives';
import { ChevronLeft } from 'react-feather';

export const InfoContainer = styled(FlexContainer)`
  height: 100vh;
  width: 100%;
`;
export const LeftArrow = styled(ChevronLeft)`
  color: ${props => props.theme.light4};
  padding: 0.4rem 0.5rem 0;
`;
