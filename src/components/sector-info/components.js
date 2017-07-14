import styled from 'styled-components';

import { Link } from 'react-router';
import { ChevronRight } from 'react-feather';
import { Header2, Header4, FlexContainer } from 'primitives';

export const InfoContainer = styled(FlexContainer)`
  height: 100vh;
  width: 100%;
`;
export const NameHeader = styled(Header2)`
  text-align: center;
`;
export const SectorNameContainer = styled(FlexContainer)`flex: 1;`;
export const Name = styled(Header4)`
  margin: 0;
`;
export const Key = styled.div`
  color: ${props => props.theme.light1};
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;
export const RightArrow = styled(ChevronRight)`
  color: ${props => props.theme.dark3};
  transition: color 0.5s;
`;
export const SystemContainer = styled(Link)`
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
