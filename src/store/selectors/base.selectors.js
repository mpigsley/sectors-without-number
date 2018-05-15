/* User */
export const userModelSelector = state => state.user.model;
export const userLocaleSelector = state =>
  (state.user.model || {}).locale || 'en';
export const isDropdownActiveSelector = state => state.user.isDropdownActive;
export const isUserEditModalOpenSelector = state => state.user.isEditModalOpen;
export const isSyncModalOpenSelector = state => state.user.isSyncModalOpen;
export const isInitializedSelector = state => state.user.isInitialized;
export const userUidSelector = state => (state.user.model || {}).uid;
export const userFormSelector = state => state.user.form;

/* Entity */
export const entitySelector = state => state.entity.models;
export const sectorSelector = state => state.entity.models.sector;
export const currentSectorSelector = state => state.entity.currentSector;
export const currentEntityTypeSelector = state =>
  state.entity.currentEntityType;
export const currentEntitySelector = state => state.entity.currentEntity;
export const savedSectorSelector = state => state.entity.saved;
export const fetchedSectorSelector = state => state.entity.fetched;
export const shareSectorSelector = state => state.entity.share;
export const isSharedSectorSelector = state => !!state.entity.share;

/* Sector */
export const configurationSelector = state => state.sector.configuration;
export const holdKeySelector = state => state.sector.holdKey;
export const hoverKeySelector = state => state.sector.hoverKey;
export const renderSectorSelector = state => state.sector.renderSector;
export const topLevelKeySelector = state => state.sector.topLevelKey;
export const syncLockSelector = state => state.sector.syncLock;
export const exportTypeSelector = state => state.sector.exportType;
export const isExportOpenSelector = state => state.sector.isExportOpen;
export const isPrintingSelector = state => state.sector.isPrinting;

/* Sidebar Edit */
export const sidebarEditSelector = state => state.sidebarEdit;
export const isSidebarEditActiveSelector = state =>
  state.sidebarEdit.isSidebarEditActive;
export const sidebarEditEntitySelector = state => state.sidebarEdit.entity;
export const sidebarEditChildrenSelector = state => state.sidebarEdit.children;

/* Router */
export const routerLocationSelector = state =>
  state.routing.locationBeforeTransitions;

/* Navigation */
export const navigationRoutesSelector = state => state.navigation.routes;
export const navigationSettingsSelector = state => state.navigation.settings;
export const navigationSettingsRouteSelector = state =>
  state.navigation.settings.route;
export const isHelpOpenSelector = state => state.navigation.isHelpOpen;
export const fetchedNavigationSelector = state => state.navigation.fetched;
export const navigationSyncLockSelector = state => state.navigation.syncLock;
