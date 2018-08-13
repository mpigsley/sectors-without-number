import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navigation from 'components/navigation';
import SectorMap from 'components/sector-map';
import Sidebar from 'components/sidebar';
import OverviewList from 'components/overview-list';
import OverviewTable from 'components/overview-table';
import EmptyOverview from 'components/empty-overview';
import FactionTable from 'components/faction-table';
import FactionSidebar from 'components/faction-sidebar';

import Elements from 'constants/elements';

import './style.css';

const DEFAULT_ELEMENT_TYPE = Elements.faction.key;

export default function GameRoutes() {
  return (
    <div className="GameRoutes">
      <Navigation className="GameRoutes-Navigation" />
      <Switch>
        <Route
          path="/sector/:sector"
          render={({ match }) => (
            <SectorMap>
              <Route
                path={`${match.path}/:entityType?/:entity?`}
                component={Sidebar}
              />
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
          path={`/elements/:sector/${Elements.faction.key}`}
          render={({ match }) => (
            <FactionTable>
              <Route
                path={`${match.path}/:element`}
                component={FactionSidebar}
              />
            </FactionTable>
          )}
        />
        <Redirect
          from="/elements/:sector"
          to={`/elements/:sector/${DEFAULT_ELEMENT_TYPE}`}
        />
      </Switch>
    </div>
  );
}
