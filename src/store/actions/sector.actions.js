import { syncLock } from 'utils/entity';

const ACTION_PREFIX = '@@sector';
export const ENTITY_HELD = `${ACTION_PREFIX}/ENTITY_HELD`;
export const RELEASE_HELD = `${ACTION_PREFIX}/RELEASE_HELD`;
export const ENTITY_HOVERED = `${ACTION_PREFIX}/ENTITY_HOVERED`;
export const UPDATED_CONFIGURATION = `${ACTION_PREFIX}/UPDATED_CONFIGURATION`;
export const RELEASED_SYNC_LOCK = `${ACTION_PREFIX}/RELEASED_SYNC_LOCK`;
export const TOP_LEVEL_ENTITY_CREATED = `${ACTION_PREFIX}/TOP_LEVEL_ENTITY_CREATED`;
export const CANCELED_TOP_LEVEL_ENTITY_CREATE = `${ACTION_PREFIX}/CANCELED_TOP_LEVEL_ENTITY_CREATE`;
export const SET_EXPORT_TYPE = `${ACTION_PREFIX}/SET_EXPORT_TYPE`;
export const OPENED_EXPORT = `${ACTION_PREFIX}/OPENED_EXPORT`;
export const CLOSED_EXPORT = `${ACTION_PREFIX}/CLOSED_EXPORT`;
export const PRINTING_STARTED = `${ACTION_PREFIX}/PRINTING_STARTED`;
export const PRINTING_COMPLETE = `${ACTION_PREFIX}/PRINTING_COMPLETE`;
export const CLEARED_MAP_KEYS = `${ACTION_PREFIX}/CLEARED_MAP_KEYS`;
export const TOGGLE_PLAYER_VIEW = `${ACTION_PREFIX}/TOGGLE_PLAYER_VIEW`;
export const OPENED_SECTOR_EXPANSION = `${ACTION_PREFIX}/OPENED_SECTOR_EXPANSION`;
export const CLOSED_SECTOR_EXPANSION = `${ACTION_PREFIX}/CLOSED_SECTOR_EXPANSION`;

export const entityHold = key => syncLock(ENTITY_HELD, { key });
export const entityRelease = () => syncLock(RELEASE_HELD);
export const entityHover = key => syncLock(ENTITY_HOVERED, { key });
export const releaseSyncLock = () => ({ type: RELEASED_SYNC_LOCK });
export const topLevelEntityCreate = key =>
  syncLock(TOP_LEVEL_ENTITY_CREATED, { key });
export const cancelTopLevelEntityCreate = () =>
  syncLock(CANCELED_TOP_LEVEL_ENTITY_CREATE);
export const updateConfiguration = (key, value) =>
  syncLock(UPDATED_CONFIGURATION, { key, value });
export const setEntityExport = exportType =>
  syncLock(SET_EXPORT_TYPE, { exportType });
export const openExport = () => ({ type: OPENED_EXPORT });
export const closeExport = () => ({ type: CLOSED_EXPORT });
export const openSectorExpansion = () => ({ type: OPENED_SECTOR_EXPANSION });
export const closeSectorExpansion = () => ({ type: CLOSED_SECTOR_EXPANSION });
export const startPrint = () => ({ type: PRINTING_STARTED });
export const endPrint = () => ({ type: PRINTING_COMPLETE });
export const clearMapKeys = () => ({ type: CLEARED_MAP_KEYS });
export const togglePlayerView = () => ({ type: TOGGLE_PLAYER_VIEW });
