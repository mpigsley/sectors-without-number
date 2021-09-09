import { createSelector } from 'reselect';

import { find, mapValues } from 'constants/lodash';
import { coordinateKey } from 'utils/common';

import {
  currentSectorSelector,
  navigationRoutesSelector,
  navigationSettingsSelector,
} from 'store/selectors/base.selectors';
import { getAllTopLevelEntities } from 'store/selectors/entity.selectors';

export const getCurrentSectorNavigation = createSelector(
  [currentSectorSelector, navigationRoutesSelector, getAllTopLevelEntities],
  (sector, routes, entities) =>
    mapValues(routes[sector], (route) => {
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
      const firstHidden = firstEntity ? !!firstEntity.isHidden : true;
      const lastHidden = lastEntity ? !!lastEntity.isHidden : true;
      const hiddenByEntity = firstHidden || lastHidden;
      return {
        ...route,
        hiddenByEntity,
        isHidden: route.isHidden || hiddenByEntity,
        from: firstEntity ? firstEntity.name : firstKey,
        to: lastEntity ? lastEntity.name : lastKey,
      };
    }),
);

export const getCurrentNavigationWithSettings = createSelector(
  [getCurrentSectorNavigation, navigationSettingsSelector],
  (routes, settings) =>
    settings.isCreatingRoute ? { ...routes, settings } : routes,
);
