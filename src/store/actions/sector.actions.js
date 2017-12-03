export const UPDATE_CONFIGURATION = 'UPDATE_CONFIGURATION';

export const updateConfiguration = (key, value) => ({
  type: UPDATE_CONFIGURATION,
  key,
  value,
});
