import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import theme from 'utils/theme';
import registerServiceWorker from 'registerServiceWorker';
import store from 'store';

import Sector from 'components/sector';
import Home from 'components/home';
import Configure from 'components/configure';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
  }
`;

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Sector}>
          <IndexRoute component={Home} />
          <Route path="/configure" component={Configure} />
        </Route>
        <Route path="/sector" component={Sector} />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
