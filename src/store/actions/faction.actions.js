const ACTION_PREFIX = '@@faction';
export const UPDATE_FORM = `${ACTION_PREFIX}/UPDATE_FORM`;

export const updateFaction = update => ({ type: UPDATE_FORM, update });
