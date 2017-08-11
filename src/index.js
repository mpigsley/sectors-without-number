import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import localForage from 'localforage';

import store from 'store';

import { setSavedSectors } from 'store/actions/sector.actions';
import HexBackground from 'components/hex-background';
import Home from 'components/home';
import Configure from 'components/configure';
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

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={HexBackground}>
        <IndexRoute component={Home} />
        <Route path="/configure" component={Configure} />
      </Route>
      <Route path="/sector" component={Sector}>
        <IndexRoute component={SectorInfo} />
        <Route path="system/:system" component={SystemInfo} />
        <Route path="system/:system/planet/:planet" component={PlanetInfo} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
