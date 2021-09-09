import { connect } from 'react-redux';

import { isInitializedSelector } from 'store/selectors/base.selectors';
import EmptyOverview from './empty-overview';

const mapStateToProps = (state) => ({
  isInitialized: isInitializedSelector(state),
});

export default connect(mapStateToProps)(EmptyOverview);
