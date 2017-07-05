import React from 'react';

import {
  Header1,
  Header2,
  Link,
  ContentContainer,
  SubContainer,
} from '../../primitives';
import {
  RowContainer,
  Row,
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
        <Link padded to="/configure">Generate Sector</Link>
        <Link padded to="https://sinenominepublishing.com/collections/stars-without-number/products/stars-without-number-core-pdf">SWN Source Book</Link>
      </SubContainer>
    </ContentContainer>
  );
}
