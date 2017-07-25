import styled from 'styled-components';

import { Link } from 'react-router';
import { ChevronRight } from 'react-feather';
import { FlexContainer } from 'primitives';

export const LinkContainer = styled(FlexContainer)`
  flex: 1;
`;
export const RightArrow = styled(ChevronRight)`
  color: ${props => props.theme.dark3};
  transition: color 0.5s;
`;
export const LinkRow = styled(Link)`
  background-color: ${props => props.theme.dark3};
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${props => props.theme.primary};

    & ${RightArrow} {
      color: ${props => props.theme.light4};
    }
  }
`;
