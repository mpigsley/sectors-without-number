import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  getPrintableEntities,
  getCurrentSector,
} from 'store/selectors/entity.selectors';
import OverviewTable from './overview-table';

const mapStateToProps = state => ({
  entities: getPrintableEntities(state),
  currentSector: getCurrentSector(state),
});

export default injectIntl(connect(mapStateToProps)(OverviewTable));
