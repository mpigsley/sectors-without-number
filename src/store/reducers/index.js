import { reducer as toastrReducer } from 'react-redux-toastr';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import sector from './sector.reducers';
import user from './user.reducers';
import entity from './entity.reducers';
import sidebar from './sidebar.reducers';
import navigation from './navigation.reducers';
import layer from './layer.reducers';
import faction from './faction.reducers';
import settings from './settings.reducers';
import tag from './tag.reducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    sector,
    user,
    entity,
    sidebar,
    navigation,
    layer,
    faction,
    settings,
    tag,
  });
