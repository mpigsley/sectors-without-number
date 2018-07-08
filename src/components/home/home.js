import React, { Fragment } from 'react';

import Header, { HeaderType } from 'primitives/text/header';
import StarBackground from 'components/star-background';

import './style.css';

export default function Home() {
  return (
    <Fragment>
      <StarBackground>
        <div className="Home-Header">
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
        </div>
      </StarBackground>
    </Fragment>
  );
}
