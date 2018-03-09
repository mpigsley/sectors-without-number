import { connect } from 'react-redux';

import { getCurrentEntities } from 'store/selectors/entity.selectors';
import { currentSectorSelector } from 'store/selectors/base.selectors';
import OverviewList from './overview-list';

const mapStateToProps = state => ({
  currentSector: currentSectorSelector(state),
  entities: getCurrentEntities(state),
});

export default connect(mapStateToProps)(OverviewList);
