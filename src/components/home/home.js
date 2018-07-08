import React, { Fragment } from 'react';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import StarBackground from 'components/star-background';

import './style.css';

export default function Home() {
  return (
    <Fragment>
      <StarBackground>
        <FlexContainer
          direction="column"
          justify="center"
          className="Home-Header"
        >
          <Header
            noMargin
            type={HeaderType.header1}
            className="Home-MainHeader"
          >
            Sectors Without Number
          </Header>
          <Header type={HeaderType.header2} className="Home-SubHeader">
            Sector Generator
          </Header>
        </FlexContainer>
      </StarBackground>
    </Fragment>
  );
}
