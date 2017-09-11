import { createSelector } from 'reselect';

import { getCurrentSector } from 'store/selectors/sector.selectors';

const systemRouteSelector = (state, props) => props.routeParams.system;

// eslint-disable-next-line import/prefer-default-export
export const makeGetCurrentSystem = () =>
  createSelector(
    [getCurrentSector, systemRouteSelector],
    (sector, system) => (sector.systems || {})[system] || {},
  );
