import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import Fastclick from 'react-fastclick';
import Firebase from 'firebase/app';
import { firestore as Firestore } from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';

import store, { history } from 'store';

import AppWrapper from 'components/app-wrapper';
import Home from 'components/home';
import Configure from 'components/configure';
import Changelog from 'components/changelog';
import SectorMap from 'components/sector-map';
import Sidebar from 'components/sidebar';
import OverviewList from 'components/overview-list';
import OverviewTable from 'components/overview-table';
import EmptyOverview from 'components/empty-overview';

import 'styles/global.css';
import 'react-hint/css/index.css';

Fastclick();
Firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
});

// Temporary until deprecation notice goes away
Firestore().settings({ timestampsInSnapshots: true });

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <AppWrapper>
          <Route exact path="/" component={Home} />
          <Route path="/configure" component={Configure} />
          <Route path="/changelog" component={Changelog} />
          <Route
            path="/sector/:sector"
            render={({ match }) => (
              <SectorMap>
                <Switch>
                  <Route
                    path={`${match.path}/:entityType/:entity`}
                    component={Sidebar}
                  />
                  <Route
                    path={`${match.path}/:entityType`}
                    component={Sidebar}
                  />
                  <Route path={match.path} component={Sidebar} />
                </Switch>
              </SectorMap>
            )}
          />
          <Route
            path="/overview/:sector"
            render={({ match }) => (
              <OverviewList>
                <Switch>
                  <Route
                    path={`${match.path}/:entityType`}
                    component={OverviewTable}
                  />
                  <Route path={match.path} component={EmptyOverview} />
                </Switch>
              </OverviewList>
            )}
          />
        </AppWrapper>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
