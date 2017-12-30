/* User */
export const userModelSelector = state => state.user.model;
export const isDropdownActiveSelector = state => state.user.isDropdownActive;
export const isInitializedSelector = state => state.user.isInitialized;

/* Entity */
export const entitySelector = state => state.entity;
export const asteroidBaseSelector = state => state.entity.asteroidBase;
export const asteroidBeltSelector = state => state.entity.asteroidBelt;
export const blackHoleSelector = state => state.entity.blackHole;
export const deepSpaceStationSelector = state => state.entity.deepSpaceStation;
export const gasGiantMineSelector = state => state.entity.gasGiantMine;
export const moonSelector = state => state.entity.moon;
export const moonBaseSelector = state => state.entity.moonBase;
export const orbitalRuinSelector = state => state.entity.orbitalRuin;
export const planetSelector = state => state.entity.planet;
export const refuelingStationSelector = state => state.entity.refuelingStation;
export const researchBaseSelector = state => state.entity.researchBase;
export const sectorSelector = state => state.entity.sector;
export const spaceStationSelector = state => state.entity.spaceStation;
export const systemSelector = state => state.entity.system;

/* Sector */
export const currentSectorSelector = state => state.sector.currentSector;
export const currentEntityTypeSelector = state =>
  state.sector.currentEntityType;
export const currentEntitySelector = state => state.sector.currentEntity;
export const configurationSelector = state => state.sector.configuration;
export const savedSectorSelector = state => state.sector.saved;
export const holdKeySelector = state => state.sector.holdKey;
export const hoverKeySelector = state => state.sector.hoverKey;
export const renderSectorSelector = state => state.sector.renderSector;
export const topLevelKeySelector = state => state.sector.topLevelKey;

/* Sidebar Edit */
export const sidebarEditSelector = state => state.sidebarEdit;
export const isSidebarEditActiveSelector = state =>
  state.sidebarEdit.isSidebarEditActive;
export const sidebarEditEntitySelector = state => state.sidebarEdit.entity;
export const sidebarEditChildrenSelector = state => state.sidebarEdit.children;
