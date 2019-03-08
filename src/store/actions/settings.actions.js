
const ACTION_PREFIX = '@@settings';
export const UPDATE_SETTINGS = `${ACTION_PREFIX}/UPDATE_SETTINGS`;

export const updateSettings = (key, value) => ({ type: UPDATE_SETTINGS, key: key, value: value });