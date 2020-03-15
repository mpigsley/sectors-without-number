import { ROWS, COLUMNS } from 'constants/defaults';
import { generateSectorName } from 'utils/name-generator';

export default ({
  sectorName = generateSectorName(),
  rows = ROWS,
  columns = COLUMNS,
} = {}) => ({
  name: sectorName,
  rows,
  columns,
});
