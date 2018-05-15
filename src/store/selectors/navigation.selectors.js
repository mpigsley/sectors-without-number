import { createSelector } from 'reselect';
import { find, mapValues } from 'lodash';
import { coordinateKey } from 'utils/common';

import {
  currentSectorSelector,
  navigationRoutesSelector,
  navigationSettingsSelector,
} from 'store/selectors/base.selectors';
import { getCurrentTopLevelEntities } from 'store/selectors/entity.selectors';

export const getCurrentSectorNavigation = createSelector(
  [currentSectorSelector, navigationRoutesSelector],
  (sector, routes) => routes[sector] || {},
);

export const getCurrentNavigationWithSettings = createSelector(
  [getCurrentSectorNavigation, navigationSettingsSelector],
  (routes, settings) =>
    settings.isCreatingRoute ? { ...routes, settings } : routes,
);

export const getNamedRoutes = createSelector(
  [getCurrentSectorNavigation, getCurrentTopLevelEntities],
  (routes, entities) =>
    mapValues(routes, route => {
      const firstKey = route.route[0];
      const lastKey = route.route[route.route.length - 1];
      const firstEntity = find(
        entities,
        ({ x, y }) => coordinateKey(x, y) === firstKey,
      );
      const lastEntity = find(
        entities,
        ({ x, y }) => coordinateKey(x, y) === lastKey,
      );
      return {
        ...route,
        from: firstEntity ? firstEntity.name : firstKey,
        to: lastEntity ? lastEntity.name : lastKey,
      };
    }),
);
