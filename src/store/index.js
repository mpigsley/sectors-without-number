import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

export const history = createHistory();
const middleware = [thunk, routerMiddleware(history)];

export default createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    toastr: toastrReducer,
  }),
  composeWithDevTools(applyMiddleware(...middleware)),
);
