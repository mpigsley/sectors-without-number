export const RESET_NAV_SETTINGS = 'RESET_NAV_SETTINGS';
export const UPDATED_NAV_SETTINGS = 'UPDATED_NAV_SETTINGS';

export const resetNavSettings = () => ({ type: RESET_NAV_SETTINGS });
export const updateNavSettings = (key, value) => ({
  type: UPDATED_NAV_SETTINGS,
  key,
  value,
});
