import React from 'react';
import PropTypes from 'prop-types';
import { Settings, Zap } from 'react-feather';

import { Link, LinkIcon } from 'primitives';
import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/containers/content-container';
import SubContainer from 'primitives/containers/sub-container';

import './style.css';

export default function Home({ seed }) {
  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header type={HeaderType.header1}>Sectors Without Number</Header>
      <SubContainer fullWidth justify="center" align="center">
        <div className="Home-RowContainer">
          <div className="Home-Row Home-Row--left" />
        </div>
        <Header type={HeaderType.header2}>Sector Generator & Notepad</Header>
        <div className="Home-RowContainer">
          <div className="Home-Row" />
        </div>
      </SubContainer>
      <SubContainer wrap justify="center" align="center">
        <Link padded to="/configure">
          <LinkIcon icon={Settings} size="20" />
          Configure
        </Link>
        <Link
          padded
          to={{
            pathname: '/sector',
            query: { s: seed, c: 8, r: 10 },
          }}
        >
          <LinkIcon icon={Zap} size="20" />
          Generate
        </Link>
      </SubContainer>
    </ContentContainer>
  );
}

Home.propTypes = {
  seed: PropTypes.string.isRequired,
};
