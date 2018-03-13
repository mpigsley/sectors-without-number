import { connect } from 'react-redux';

import {
  getPrintableEntities,
  getCurrentSector,
} from 'store/selectors/entity.selectors';
import OverviewTable from './overview-table';

const mapStateToProps = state => ({
  entities: getPrintableEntities(state),
  currentSector: getCurrentSector(state),
});

export default connect(mapStateToProps)(OverviewTable);
