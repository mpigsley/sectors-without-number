import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import theme from './utils/theme';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store';

import HexCanvas from './components/hex-canvas';
import Home from './components/home';
import Configure from './components/configure';
import Sector from './components/sector';

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
        <HexCanvas>
          <Route exact path="/" component={Home} />
          <Route path="/configure" component={Configure} />
          <Route path="/sector" component={Sector} />
        </HexCanvas>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
