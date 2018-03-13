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
import Sidebar from 'components/sidebar';
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
        <Route exact path="/configure" component={Configure} />
        <Route exact path="/changelog" component={Changelog} />
        <Route exact path="/overview/:sector" component={EmptyOverview} />
        <Route
          exact
          path="/overview/:sector/:entityType"
          component={OverviewTable}
        />
        <Route exact path="/sector/:sector" component={Sidebar} />
        <Route
          exact
          path="/sector/:sector/:entityType/:entity"
          component={Sidebar}
        />
      </AppWrapper>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
