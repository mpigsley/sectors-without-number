import React from 'react';
import styled, { css } from 'styled-components';

const style = css`
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
  margin-top: -0.1rem;
`;

export { style };
export default styled(({ icon, ...rest }) => {
  const Icon = icon;
  return <Icon {...rest} />;
})`${style}`;
