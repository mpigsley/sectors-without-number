import localForage from 'localforage';

export const setEntity = (entity, key) => localForage.setItem(key, entity);
export const removeSector = key => localForage.removeItem(key);
export const clearLocalDatabase = () => localForage.clear();
export const getLocalSectors = () =>
  new Promise((resolve, reject) => {
    const savedSectors = {};
    localForage
      .iterate((value, key) => {
        savedSectors[key] = value;
      })
      .then(() => resolve(savedSectors))
      .catch(reject);
  });
