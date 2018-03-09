import React from 'react';

import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default function OverviewTable() {
  return (
    <FlexContainer
      flex="3"
      direction="column"
      align="center"
      justify="center"
      className="OverviewTable"
    >
      Table
    </FlexContainer>
  );
}
