import styled, { css } from 'styled-components';

import { style as FlexContainerStyle } from '../containers/flex-container';

const style = css`
  height: 100%;
  ${FlexContainerStyle}
`;

export default styled.div`
  ${style};
`;
