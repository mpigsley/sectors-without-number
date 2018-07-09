import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

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
          align="center"
          justify="center"
          className="Home-Hero"
        >
          <div className="Home-Glitch">
            <Header
              noMargin
              type={HeaderType.header1}
              className="Home-MainHeader"
              data-text="Sectors Without Number"
            >
              Sectors Without Number
            </Header>
            <Header
              type={HeaderType.header2}
              className="Home-SubHeader"
              data-text="Sector Generator"
            >
              Sector Generator
            </Header>
          </div>
          <FlexContainer className="Home-Actions">
            <button className="Home-Action">
              <span className="Home-HexagonWrap">
                <span className="Home-Hexagon" />
              </span>
              <FormattedMessage id="misc.configure" />
            </button>
            <button className="Home-Action">
              <span className="Home-HexagonWrap">
                <span className="Home-Hexagon" />
              </span>
              <FormattedMessage id="misc.generate" />
            </button>
          </FlexContainer>
        </FlexContainer>
        <h1>Some more stuff</h1>
      </StarBackground>
    </Fragment>
  );
}
