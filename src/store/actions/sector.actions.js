export const ENTITY_HOLD = 'ENTITY_HOLD';
export const RELEASE_HOLD = 'RELEASE_HOLD';
export const ENTITY_HOVER_START = 'ENTITY_HOVER_START';
export const ENTITY_HOVER_END = 'ENTITY_HOVER_END';
export const UPDATE_CONFIGURATION = 'UPDATE_CONFIGURATION';
export const RELEASE_SYNC_LOCK = 'RELEASE_SYNC_LOCK';
export const TOP_LEVEL_ENTITY_CREATE = 'TOP_LEVEL_ENTITY_CREATE';
export const CANCEL_TOP_LEVEL_ENTITY_CREATE = 'CANCEL_TOP_LEVEL_ENTITY_CREATE';

export const entityHold = key => ({ type: ENTITY_HOLD, key });
export const entityRelease = () => ({ type: RELEASE_HOLD });
export const entityHoverStart = key => ({ type: ENTITY_HOVER_START, key });
export const entityHoverEnd = key => ({ type: ENTITY_HOVER_END, key });
export const releaseSyncLock = () => ({ type: RELEASE_SYNC_LOCK });
export const topLevelEntityCreate = key => ({
  type: TOP_LEVEL_ENTITY_CREATE,
  key,
});
export const cancelTopLevelEntityCreate = () => ({
  type: CANCEL_TOP_LEVEL_ENTITY_CREATE,
});

export const updateConfiguration = (key, value) => ({
  type: UPDATE_CONFIGURATION,
  key,
  value,
});
