import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';

const middleware = [
  thunk,
  routerMiddleware(browserHistory),
];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  applyMiddleware(...middleware),
);
