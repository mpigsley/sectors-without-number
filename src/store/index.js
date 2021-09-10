import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { throttle } from 'constants/lodash';

import { loadState, saveState } from './localStorage';

import createRootReducer from './reducers';

export const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    loadState(),
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  // have at least a second delay between the local storage saves
  store.subscribe(throttle(() => saveState(store.getState()), 1000));

  return store;
}
