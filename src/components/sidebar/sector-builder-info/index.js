import React from 'react';
import { FormattedMessage } from 'react-intl';

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
      <Header type={HeaderType.header3}>
        <FormattedMessage id="misc.welcomeBuilder" />
      </Header>
      <ol className="SectorBuilderInfo-WelcomeList">
        <li className="SectorBuilderInfo-WelcomeItem">
          <FormattedMessage id="misc.createASystem" />
        </li>
        <li className="SectorBuilderInfo-WelcomeItem">
          <FormattedMessage id="misc.moveSystem" />
        </li>
        <li className="SectorBuilderInfo-WelcomeItem">
          <FormattedMessage id="misc.createEditPlanets" />
        </li>
      </ol>
    </FlexContainer>
  );
}
