import styled, { css } from 'styled-components';

const common = css`
  color: ${props => props.theme.light4};
  font-weight: 200;
  margin: 1rem 0;
  text-align: center;
`;

export const Header1 = styled.h1`
  ${common}
  font-size: 4rem;
  font-weight: 300;
`;
export const Header2 = styled.h2`
  ${common}
  font-size: 1.7rem;
`;
export const Header3 = styled.h3`
  ${common}
  font-size: 1.4rem;
`;
export const Header4 = styled.h4`
  ${common}
  font-size: 1.1rem;
`;
export const SectionHeader = styled.h3`
  color: ${props => props.theme.light4};
  border-bottom: 1px solid ${props => props.theme.light1};
  font-size: 1.3rem;
  font-weight: 200;
  margin: 1rem;
  padding: 0.5rem;
  text-align: left;
  width: calc(100% - 3rem);
`;
