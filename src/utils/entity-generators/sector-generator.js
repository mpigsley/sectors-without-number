import { ROWS, COLUMNS } from 'constants/defaults';
import { generateSectorName } from 'utils/name-generator';

export default (config, { name = generateSectorName() } = {}) => ({
  name: config.sectorName || name,
  rows: config.rows || ROWS,
  columns: config.columns || COLUMNS,
});
