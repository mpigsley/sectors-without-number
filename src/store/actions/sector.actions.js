import { syncLock } from 'utils/entity';

export const ENTITY_HOLD = 'ENTITY_HOLD';
export const RELEASE_HOLD = 'RELEASE_HOLD';
export const ENTITY_HOVER = 'ENTITY_HOVER';
export const UPDATE_CONFIGURATION = 'UPDATE_CONFIGURATION';
export const RELEASE_SYNC_LOCK = 'RELEASE_SYNC_LOCK';
export const TOP_LEVEL_ENTITY_CREATE = 'TOP_LEVEL_ENTITY_CREATE';
export const CANCEL_TOP_LEVEL_ENTITY_CREATE = 'CANCEL_TOP_LEVEL_ENTITY_CREATE';
export const SET_EXPORT_TYPE = 'SET_EXPORT_TYPE';
export const OPENED_EXPORT = 'OPENED_EXPORT';
export const CLOSED_EXPORT = 'CLOSED_EXPORT';
export const PRINTING_STARTED = 'PRINTING_STARTED';
export const PRINTING_COMPLETE = 'PRINTING_COMPLETE';

export const entityHold = key => syncLock(ENTITY_HOLD, { key });
export const entityRelease = () => syncLock(RELEASE_HOLD);
export const entityHover = key => syncLock(ENTITY_HOVER, { key });
export const releaseSyncLock = () => ({ type: RELEASE_SYNC_LOCK });
export const topLevelEntityCreate = key =>
  syncLock(TOP_LEVEL_ENTITY_CREATE, { key });
export const cancelTopLevelEntityCreate = () =>
  syncLock(CANCEL_TOP_LEVEL_ENTITY_CREATE);
export const updateConfiguration = (key, value) =>
  syncLock(UPDATE_CONFIGURATION, { key, value });
export const setEntityExport = exportType =>
  syncLock(SET_EXPORT_TYPE, { exportType });
export const openExport = () => ({ type: OPENED_EXPORT });
export const closeExport = () => ({ type: CLOSED_EXPORT });
export const startPrint = () => ({ type: PRINTING_STARTED });
export const endPrint = () => ({ type: PRINTING_COMPLETE });
