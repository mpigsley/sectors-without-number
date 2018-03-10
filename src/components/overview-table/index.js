import { connect } from 'react-redux';

import { getPrintableEntities } from 'store/selectors/entity.selectors';
import OverviewTable from './overview-table';

const mapStateToProps = state => ({
  entities: getPrintableEntities(state),
});

export default connect(mapStateToProps)(OverviewTable);
