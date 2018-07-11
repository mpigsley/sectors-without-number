import React, { Fragment } from 'react';
import Loadable from 'react-loadable';

const LoadableGameRoutes = Loadable.Map({
  delay: 400,
  loading: () => <Fragment />,
  loader: {
    Component: () =>
      import(/* webpackChunkName: "game-routes" */ 'components/game-routes/routes'),
  },
  render: (loaded, props) => {
    const Routes = loaded.Component.default;
    return <Routes {...props} />;
  },
});

export default function GameRoutes() {
  return <LoadableGameRoutes />;
}
