import { ROWS, COLUMNS } from 'constants/defaults';
import { generateSectorName } from 'utils/name-generator';

export default ({
  name = generateSectorName(),
  rows = ROWS,
  columns = COLUMNS,
} = {}) => ({
  name,
  rows,
  columns,
});
