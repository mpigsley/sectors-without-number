import localForage from 'localforage';

export const setSector = (key, sector) => localForage.setItem(key, sector);
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
