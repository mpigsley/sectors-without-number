import React from 'react';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Spinner from 'primitives/other/spinner';

import './style.css';

export default function Loading() {
  return (
    <FlexContainer
      className="Loading"
      align="center"
      justify="center"
      direction="column"
    >
      <Spinner isLight size={70} />
      <Header type={HeaderType.header2}>Loading</Header>
    </FlexContainer>
  );
}
