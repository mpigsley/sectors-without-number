import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import theme from './utils/theme';
import HexBackground from './components/hex-background';
import Home from './components/home';
import Configure from './components/configure';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
  }
`;

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <HexBackground>
        <Route exact path="/" component={Home} />
        <Route path="/configure" component={Configure} />
      </HexBackground>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
