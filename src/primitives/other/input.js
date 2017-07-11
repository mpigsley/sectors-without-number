import styled, { css } from 'styled-components';

const style = css`
  display: inline-block;
  border: none;
  height: 38px;
  padding: 0 10px;
  color: ${props => props.theme.dark4};
  background-color: ${props => props.theme.light4};
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: .1rem;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 4px;
  box-sizing: border-box;
  font-weight: 400;
  transition: all 0.3s;
  outline: none;
  width: ${props => props.width || '100%'};
`;

export { style };
export default styled.input`
  ${style};
`;
