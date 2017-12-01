export const SYSTEM_HOLD = 'SYSTEM_HOLD';
export const RELEASE_HOLD = 'RELEASE_HOLD';
export const SYSTEM_HOVER_START = 'SYSTEM_HOVER_START';
export const SYSTEM_HOVER_END = 'SYSTEM_HOVER_END';

export const systemHold = key => ({ type: SYSTEM_HOLD, key });
export const systemRelease = () => ({ type: RELEASE_HOLD });
export const systemHoverStart = key => ({ type: SYSTEM_HOVER_START, key });
export const systemHoverEnd = key => ({ type: SYSTEM_HOVER_END, key });
