import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store, { history } from 'store';
import init from 'init';

import AppWrapper from 'components/app-wrapper';
import Home from 'components/home';
import Configure from 'components/configure';
import Changelog from 'components/changelog';
import Sector from 'components/sector';
import OverviewTable from 'components/overview-table';
import EmptyOverview from 'components/empty-overview';

import 'styles/global.css';
import 'react-hint/css/index.css';

init(store);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppWrapper>
        <Route exact path="/" component={Home} />
        <Route path="/configure" component={Configure} />
        <Route path="/changelog" component={Changelog} />
        <Route path="/sector" component={Sector} />
        <Route exact path="/overview/:sector" component={EmptyOverview} />
        <Route
          exact
          path="/overview/:sector/:entityType"
          component={OverviewTable}
        />
      </AppWrapper>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
