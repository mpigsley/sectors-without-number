import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import logo from './logo.svg';

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const AppContainer = styled.div`
  text-align: center;
`;
const Header = styled.div`
  background-color: ${props => props.theme.dark};
  height: 150px;
  padding: 20px;
  color: ${props => props.theme.light};
`;
const Logo = styled.img`
  animation: ${rotate360} infinite 20s linear;
  height: 80px;
`;
const Intro = styled.p`
  font-size: large;
`;

export default class App extends Component {
  render() {
    return (
      <AppContainer>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>Welcome to React</h2>
        </Header>
        <Intro>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
      </AppContainer>
    );
  }
}
