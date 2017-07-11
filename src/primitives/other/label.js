import styled, { css } from 'styled-components';

const style = css`
  color: ${props => props.theme.light4};
  margin-top: ${props => (props.noPadding ? '0' : '1.2rem')};
  margin-bottom: 0.3rem;
`;

export { style };
export default styled.label`
  ${style};
`;
