import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import theme from './utils/theme';
import HexBackground from './components/hex-background';
import Home from './components/home';
import Configure from './components/configure';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
  }
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HexBackground>
          <Route exact path="/" component={Home} />
          <Route path="/configure" component={Configure} />
        </HexBackground>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
