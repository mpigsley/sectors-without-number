import styled, { css } from 'styled-components';

const style = css`
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  color: ${props => props.theme.lightest};
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: .1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.lightest};
  cursor: pointer;
  box-sizing: border-box;
  font-weight: 400;
  transition: all 0.3s;

  &:hover {
    color: ${props => props.theme.light};
    border-color: ${props => props.theme.light};
    outline: 0;
  }
`;

export { style };
export default styled.button`${style}`;
