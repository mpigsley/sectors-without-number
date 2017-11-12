import { createSelector } from 'reselect';
import { difference } from 'lodash';

import { allSectorKeys } from 'utils/common';
import { getCurrentSector } from 'store/selectors/sector.selectors';

const systemRouteSelector = (state, props) => props.routeParams.system;

// eslint-disable-next-line import/prefer-default-export
export const makeGetCurrentSystem = () =>
  createSelector(
    [getCurrentSector, systemRouteSelector],
    (sector, system) => ({ ...(sector.systems || {})[system] } || {}),
  );

export const getEmptySystemKeys = createSelector(
  [getCurrentSector],
  ({ systems, rows, columns }) =>
    difference(allSectorKeys(columns, rows), Object.keys(systems)),
);
