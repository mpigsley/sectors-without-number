import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { getPrintableEntities } from 'store/selectors/entity.selectors';
import OverviewTable from './overview-table';

const mapStateToProps = state => ({
  entities: getPrintableEntities(state),
});

export default injectIntl(connect(mapStateToProps)(OverviewTable));
