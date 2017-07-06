import styled, { css } from 'styled-components';

import { style as FlexContainerStyle } from '../containers/flex-container';

const style = css`
  ${props => (props.fullWidth ? 'width: calc(100% - 1rem)' : '')}
  ${props => (props.noMargin ? '' : 'margin: 0 1rem;')}
  text-align: center;
  ${FlexContainerStyle}
`;

export default styled.div`
  ${style};
`;
