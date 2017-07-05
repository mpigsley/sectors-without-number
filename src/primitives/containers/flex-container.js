import styled, { css } from 'styled-components';

const style = css`
  display: flex;
  justify-content: ${props => props.justify || 'initial'};
  align-items: ${props => props.align || 'initial'};
  flex-direction: ${props => props.direction || 'row'};
  ${props => props.wrap ? 'flex-wrap: wrap' : ''}
`;

export { style };
export default styled.div`${style}`;
