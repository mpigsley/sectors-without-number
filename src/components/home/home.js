import React from 'react';
import { Settings, Zap } from 'react-feather';

import { Header1, Header2, Link, ContentContainer, SubContainer, LinkIcon } from '../../primitives';
import { RowContainer, Row } from './components';

export default function Home() {
  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header1>Sector.io</Header1>
      <SubContainer fullWidth justify="center" align="center">
        <RowContainer>
          <Row left />
        </RowContainer>
        <Header2>Stars Without Number Generator</Header2>
        <RowContainer>
          <Row right />
        </RowContainer>
      </SubContainer>
      <SubContainer wrap justify="center" align="center">
        <Link padded to="/configure">
          <LinkIcon icon={Settings} size="20" />
          Configure
        </Link>
        <Link padded to="/sector">
          <LinkIcon icon={Zap} size="20" />
          Generate
        </Link>
      </SubContainer>
    </ContentContainer>
  );
}
