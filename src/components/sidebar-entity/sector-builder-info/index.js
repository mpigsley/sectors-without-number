import React from 'react';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

export default function SectorBuilderInfo() {
  return (
    <FlexContainer
      className="SectorInfo-Welcome"
      justify="center"
      direction="column"
      align="center"
    >
      <Header type={HeaderType.header3}>Welcome to the Sector Builder</Header>
      <ol className="SectorInfo-WelcomeList">
        <li className="SectorInfo-WelcomeItem">
          To <b>create a system</b> click and hold a hex to the left.
        </li>
        <li className="SectorInfo-WelcomeItem">
          To <b>move an existing system</b> click, hold, and drag.
        </li>
        <li className="SectorInfo-WelcomeItem">
          <b>Create and edit planets</b> here from the sidebar.
        </li>
      </ol>
    </FlexContainer>
  );
}
