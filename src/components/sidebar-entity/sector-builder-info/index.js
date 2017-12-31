import React from 'react';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

export default function SectorBuilderInfo() {
  return (
    <FlexContainer
      className="SectorBuilderInfo-Welcome"
      justify="center"
      direction="column"
      align="center"
    >
      <Header type={HeaderType.header3}>Welcome to the Sector Builder</Header>
      <ol className="SectorBuilderInfo-WelcomeList">
        <li className="SectorBuilderInfo-WelcomeItem">
          To <b>create a system</b> click and hold a hex to the left.
        </li>
        <li className="SectorBuilderInfo-WelcomeItem">
          To <b>move an existing system</b> click, hold, and drag.
        </li>
        <li className="SectorBuilderInfo-WelcomeItem">
          <b>Create and edit planets</b> here from the sidebar.
        </li>
      </ol>
    </FlexContainer>
  );
}
