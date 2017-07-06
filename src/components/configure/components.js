import styled from 'styled-components';

import { SubContainer } from '../../primitives';

export const ButtonContainer = styled(SubContainer)`
  margin: 0 1rem;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const PaddedButtons = styled(SubContainer)`
  margin-top: 2rem;
`;
