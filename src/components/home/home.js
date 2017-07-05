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
  HomeLink,
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
        <HomeLink to="/configure">Generate Sector</HomeLink>
        <HomeLink to="https://sinenominepublishing.com/collections/stars-without-number/products/stars-without-number-core-pdf">SWN Source Book</HomeLink>
      </SubContainer>
    </ContentContainer>
  );
}
