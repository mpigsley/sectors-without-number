import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Firebase from 'firebase';
import Fastclick from 'react-fastclick';
import 'firebase/firestore';

import store from 'store';

import AppWrapper from 'components/app-wrapper';
import HexBackground from 'components/hex-background';
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
        <Route path="/overview/:sector" component={OverviewList}>
          <IndexRoute component={EmptyOverview} />
          <Route path=":entityType" component={OverviewTable} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
