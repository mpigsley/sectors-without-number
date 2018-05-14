export const OPENED_HELP = 'OPENED_HELP';
export const RESET_NAV_SETTINGS = 'RESET_NAV_SETTINGS';
export const UPDATED_NAV_SETTINGS = 'UPDATED_NAV_SETTINGS';

export const openHelp = () => ({ type: OPENED_HELP });
export const resetNavSettings = () => ({ type: RESET_NAV_SETTINGS });
export const updateNavSettings = (key, value) => ({
  type: UPDATED_NAV_SETTINGS,
  key,
  value,
});
