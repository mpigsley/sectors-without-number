const ACTION_PREFIX = '@@navigation';
export const RESET_FORMS = `${ACTION_PREFIX}/RESET_FORMS`;
export const UPDATED_LAYER = `${ACTION_PREFIX}/UPDATED_LAYER`;
export const UPDATED_REGION = `${ACTION_PREFIX}/UPDATED_REGION`;

export const resetForms = () => ({ type: RESET_FORMS });
export const updateLayer = (key, value) => ({
  type: UPDATED_LAYER,
  key,
  value,
});
export const updateRegion = (key, value) => ({
  type: UPDATED_REGION,
  key,
  value,
});
