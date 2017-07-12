export const UPDATE_SECTOR = 'UPDATE_SECTOR_CONFIG';
export const SECTOR_HOVER_START = 'SECTOR_HOVER_START';
export const SECTOR_HOVER_END = 'SECTOR_HOVER_END';

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

export function sectorHoverStart(key) {
  return { type: SECTOR_HOVER_START, key };
}

export function sectorHoverEnd(key) {
  return { type: SECTOR_HOVER_END, key };
}
