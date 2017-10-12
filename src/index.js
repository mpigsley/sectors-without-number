import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import localForage from 'localforage';
import Firebase from 'firebase';
import Fastclick from 'react-fastclick';

import store from 'store';

import { setSavedSectors } from 'store/actions/sector.actions';
import AppWrapper from 'components/app-wrapper';
import HexBackground from 'components/hex-background';
import Home from 'components/home';
import Configure from 'components/configure';
import Changelog from 'components/changelog';
import Sector from 'components/sector';
import SectorInfo from 'components/sector-info';
import SystemInfo from 'components/system-info';
import PlanetInfo from 'components/planet-info';

import 'styles/global.css';

const history = syncHistoryWithStore(browserHistory, store);

new Promise((resolve, reject) => {
  const savedSectors = {};
  localForage
    .iterate((value, key) => {
      savedSectors[key] = value;
    })
    .then(() => resolve(savedSectors))
    .catch(reject);
}).then(saved => {
  store.dispatch(setSavedSectors(saved));
});

Fastclick();

Firebase.initializeApp({
  apiKey: 'AIzaSyDd9dgs7P1HA8EqW5yE8C2B7TLeYLTP6f4',
  authDomain: 'sector-io-23cec.firebaseapp.com',
  databaseURL: 'https://sector-io-23cec.firebaseio.com',
  projectId: 'sector-io-23cec',
  storageBucket: 'sector-io-23cec.appspot.com',
  messagingSenderId: '189524790637',
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppWrapper}>
        <Route component={HexBackground}>
          <IndexRoute component={Home} />
          <Route path="/configure" component={Configure} />
          <Route path="/changelog" component={Changelog} />
        </Route>
        <Route path="/sector" component={Sector}>
          <IndexRoute component={SectorInfo} />
          <Route path="system/:system" component={SystemInfo} />
          <Route path="system/:system/planet/:planet" component={PlanetInfo} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
