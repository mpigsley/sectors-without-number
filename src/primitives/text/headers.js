import styled, { css } from 'styled-components';

const common = css`
  color: ${props => props.theme.light4};
  font-weight: 200;
`;

export const Header1 = styled.h1`
  ${common}
  font-size: 5rem;
  font-weight: 300;
  margin: 1rem 0;
`;
export const Header2 = styled.h2`
  ${common}
  font-size: 1.8rem;
`;
export const Header3 = styled.h3`
  ${common}
  font-size: 1.4rem;
`;
export const Header4 = styled.h4`
  ${common}
  font-size: 1.2rem;
`;
