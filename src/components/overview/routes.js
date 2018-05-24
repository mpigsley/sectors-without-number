import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OverviewList from 'components/overview-list';
import OverviewTable from 'components/overview-table';
import EmptyOverview from 'components/empty-overview';

export default function OverviewRoutes() {
  return (
    <OverviewList>
      <Switch>
        <Route path="/overview/:sector/:entityType" component={OverviewTable} />
        <Route path="/overview/:sector" component={EmptyOverview} />
      </Switch>
    </OverviewList>
  );
}
