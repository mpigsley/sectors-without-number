/* User */
export const userModelSelector = state => state.user.model;
export const isLoggedInSelector = state => !!state.user.model;
export const userModelLocaleSelector = state =>
  (state.user.model || {}).locale || 'en';
export const isUserEditModalOpenSelector = state => state.user.isEditModalOpen;
export const isInitializedSelector = state => state.user.isInitialized;
export const userUidSelector = state => (state.user.model || {}).uid;
export const userFormSelector = state => state.user.form;
export const userLocaleSelector = state => state.user.locale;

/* Entity */
export const entitySelector = state => state.entity.models;
export const sectorSelector = state => state.entity.models.sector;
export const currentSectorSelector = state => state.entity.currentSector;
export const currentEntityTypeSelector = state =>
  state.entity.currentEntityType;
export const currentEntitySelector = state => state.entity.currentEntity;
export const lastOverviewEntitySelector = state =>
  state.entity.lastOverviewEntity;
export const savedSectorSelector = state => state.entity.saved;
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
export const isSectorExpansionOpenSelector = state =>
  state.sector.isSectorExpansionOpen;
export const isPrintingSelector = state => state.sector.isPrinting;
export const fetchedSectorSelector = state => state.sector.fetched;
export const playerViewSelector = state => state.sector.playerView;

/* Sidebar Edit */
export const sidebarEditSelector = state => state.sidebar;
export const isSidebarEditActiveSelector = state =>
  state.sidebar.isSidebarEditActive;
export const sidebarEditEntitySelector = state => state.sidebar.entity;
export const sidebarEditChildrenSelector = state => state.sidebar.children;

/* Router */
export const routerLocationSelector = state => state.router.location;

/* Navigation */
export const navigationRoutesSelector = state => state.navigation.routes;
export const navigationSettingsSelector = state => state.navigation.settings;
export const navigationSettingsRouteSelector = state =>
  state.navigation.settings.route;
export const isHelpOpenSelector = state => state.navigation.isHelpOpen;
export const navigationSyncLockSelector = state => state.navigation.syncLock;
export const routeLocatorSelector = state => state.navigation.routeLocator;

/* Layer */
export const layersSelector = state => state.layer.models;
export const layerFormSelector = state => state.layer.form;
export const layerIsEditingSelector = state => state.layer.isEditing;
export const layerRegionFormSelector = state => state.layer.regionForm;
export const layerColorPickerSelector = state => state.layer.colorPicker;
export const layerRegionPaintSelector = state => state.layer.regionPaint;

/* Faction */
export const factionsSelector = state => state.faction.models;
export const factionFormSelector = state => state.faction.form;
export const factionIsCreatingSelector = state => state.faction.isCreating;

/* Settings */
export const settingsSelector = state => state.settings;
export const settingsShowNumberOfChildren = state =>
  state.settings.showNumberOfChildren;
export const settingsShowEntityName = state => state.settings.showEntityName;
export const settingsShowCoordinates = state => state.settings.showCoordinates;

/* Tag */
export const getCustomTags = state => state.tag.models;
export const getIsCustomTagModalOpen = state => state.tag.isOpen;
