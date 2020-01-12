const ACTION_PREFIX = '@@tag';
export const FORM_UPDATED = `${ACTION_PREFIX}/FORM_UPDATED`;
export const OPEN_MODAL = `${ACTION_PREFIX}/OPEN_MODAL`;
export const CLOSE_MODAL = `${ACTION_PREFIX}/CLOSE_MODAL`;

export const openCustomTagModal = () => ({ type: OPEN_MODAL });
export const closeCustomTagModal = () => ({ type: CLOSE_MODAL });
