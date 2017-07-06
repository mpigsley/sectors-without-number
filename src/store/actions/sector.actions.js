export const UPDATE_SECTOR = 'UPDATE_SECTOR_CONFIG';

const ConfigKeys = {
  seed: 'seed',
  columns: 'columns',
  rows: 'rows',
};

export function updateSector(key, value) {
  if (ConfigKeys[key]) {
    return { type: UPDATE_SECTOR, key, value };
  }
  return null;
}
