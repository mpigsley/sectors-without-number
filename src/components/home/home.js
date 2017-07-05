import React from 'react';
import _ from 'lodash';

import {
  Header1,
  Header2,
} from '../../primitives';
import {
  RowContainer,
  Row,
  ContentContainer,
  SubContainer,
  HomeButton,
} from './components';

export default function Home() {
  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header1>Sector.io</Header1>
      <SubContainer fullWidth justify="center" align="center">
        <RowContainer><Row left /></RowContainer>
        <Header2>Stars Without Number Generator</Header2>
        <RowContainer><Row right /></RowContainer>
      </SubContainer>
      <SubContainer wrap justify="center" align="center">
        <HomeButton>Generate Sector</HomeButton>
        <HomeButton>SWN Source Book</HomeButton>
      </SubContainer>
    </ContentContainer>
  );
}
