import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SectorMap from 'components/sector-map';
import Sidebar from 'components/sidebar';
import OverviewList from 'components/overview-list';
import OverviewTable from 'components/overview-table';
import FactionTable from 'components/faction-table';
import FactionSidebar from 'components/faction-sidebar';
import EmptyOverview from 'components/empty-overview';

export default function GameRoutes() {
  return (
    <Switch>
      <Route
        path="/sector/:sector"
        render={({ match }) => (
          <SectorMap>
            <Switch>
              <Route
                path={`${match.path}/:entityType?/:entity?`}
                component={Sidebar}
              />
            </Switch>
          </SectorMap>
        )}
      />
      <Route
        path="/overview/:sector"
        render={({ match }) => (
          <OverviewList>
            <Switch>
              <Route
                path={`${match.path}/:entityType`}
                component={OverviewTable}
              />
              <Route path={match.path} component={EmptyOverview} />
            </Switch>
          </OverviewList>
        )}
      />
      <Route
        path="/element/faction"
        render={({ match }) => (
          <FactionTable>
            <Switch>
              <Route
                path={`${match.path}/:faction`}
                component={FactionSidebar}
              />
            </Switch>
          </FactionTable>
        )}
      />
      <Redirect from="/element" to="/element/faction" />
    </Switch>
  );
}
