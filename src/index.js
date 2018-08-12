import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import Fastclick from 'react-fastclick';
import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import store, { history } from 'store';

import AppWrapper from 'components/app-wrapper';
import Home from 'components/home';
import Configure from 'components/configure';
import Changelog from 'components/changelog';
import GameRoutes from 'components/game-routes';

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
Firebase.firestore().settings({ timestampsInSnapshots: true });

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <AppWrapper>
          <Route exact path="/" component={Home} />
          <Route path="/configure" component={Configure} />
          <Route path="/changelog" component={Changelog} />
          <Route path="/(sector|overview|element)" component={GameRoutes} />
        </AppWrapper>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
