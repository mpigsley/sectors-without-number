import styled, { css } from 'styled-components';

const style = css`
  display: flex;
  ${props => (props.justify ? `justify-content: ${props.justify};` : '')}
  ${props => (props.align ? `align-items: ${props.align};` : '')}
  ${props => (props.direction ? `flex-direction: ${props.direction};` : '')}
  ${props => (props.wrap ? 'flex-wrap: wrap;' : '')}
  ${props => (props.scroll ? 'overflow: scroll;' : '')}
  ${props => (props.flex ? `flex: ${props.flex};` : '')}
  ${props => (props.shrink ? `flex-shrink: ${props.shrink};` : '')}
`;

export { style };
export default styled.div`
  ${style};
`;
