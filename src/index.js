import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import store from 'store';
import init from 'init';

import AppWrapper from 'components/app-wrapper';
import HexBackground from 'components/hex-background';
import Home from 'components/home';
import Configure from 'components/configure';
import Changelog from 'components/changelog';
import SectorMap from 'components/sector-map';
import Sidebar from 'components/sidebar';

import 'styles/global.css';
import 'react-hint/css/index.css';

init(store);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppWrapper}>
        <Route component={HexBackground}>
          <IndexRoute component={Home} />
          <Route path="/configure" component={Configure} />
          <Route path="/changelog" component={Changelog} />
        </Route>
        <Route path="/sector/:sector" component={SectorMap}>
          <IndexRoute component={Sidebar} />
          <Route path=":entityType/:entity" component={Sidebar} />
          <Route path="**" component={Sidebar} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
