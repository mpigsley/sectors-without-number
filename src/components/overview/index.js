import React from 'react';
import Loadable from 'react-loadable';

import Loading from 'primitives/other/loading';

const LoadableOverview = Loadable.Map({
  delay: 1000,
  loading: Loading,
  loader: {
    Component: () => import('components/overview/routes'),
  },
  render: (loaded, props) => {
    const OverviewRoutes = loaded.Component.default;
    return <OverviewRoutes {...props} />;
  },
});

export default function Overview() {
  return <LoadableOverview />;
}
