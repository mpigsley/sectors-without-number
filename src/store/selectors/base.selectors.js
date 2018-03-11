/* User */
export const userModelSelector = state => state.user.model;
export const isDropdownActiveSelector = state => state.user.isDropdownActive;
export const isUserEditModalOpen = state => state.user.isEditModalOpen;
export const isInitializedSelector = state => state.user.isInitialized;
export const userUidSelector = state => (state.user.model || {}).uid;
export const userFormSelector = state => state.user.form;

/* Entity */
export const entitySelector = state => state.entity;
export const sectorSelector = state => state.entity.sector;

/* Sector */
export const currentSectorSelector = state => state.sector.currentSector;
export const currentEntityTypeSelector = state =>
  state.sector.currentEntityType;
export const currentEntitySelector = state => state.sector.currentEntity;
export const configurationSelector = state => state.sector.configuration;
export const savedSectorSelector = state => state.sector.saved;
export const sharedSectorSelector = state => state.sector.shared;
export const holdKeySelector = state => state.sector.holdKey;
export const hoverKeySelector = state => state.sector.hoverKey;
export const renderSectorSelector = state => state.sector.renderSector;
export const topLevelKeySelector = state => state.sector.topLevelKey;
export const syncLockSelector = state => state.sector.syncLock;
export const exportTypeSelector = state => state.sector.exportType;

/* Sidebar Edit */
export const sidebarEditSelector = state => state.sidebarEdit;
export const isSidebarEditActiveSelector = state =>
  state.sidebarEdit.isSidebarEditActive;
export const sidebarEditEntitySelector = state => state.sidebarEdit.entity;
export const sidebarEditChildrenSelector = state => state.sidebarEdit.children;
