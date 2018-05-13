import React from 'react';

import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default function NavigationSidebar() {
  return (
    <FlexContainer
      direction="column"
      flex="1"
      className="NavigationSidebar-Attributes"
    >
      Some Nav Stuff
    </FlexContainer>
  );
}
