import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';

export const history = createHistory();
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    toastr: toastrReducer,
  }),
  applyMiddleware(...middleware),
);
