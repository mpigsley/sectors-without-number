import { createSelector } from 'reselect';

import {
  currentSectorSelector,
  navigationRoutesSelector,
  navigationSettingsSelector,
} from 'store/selectors/base.selectors';

export const getCurrentSectorNavigation = createSelector(
  [currentSectorSelector, navigationRoutesSelector],
  (sector, routes) => routes[sector] || {},
);

export const getCurrentNavigationWithSettings = createSelector(
  [getCurrentSectorNavigation, navigationSettingsSelector],
  (routes, settings) =>
    settings.isCreatingRoute ? { ...routes, settings } : routes,
);
