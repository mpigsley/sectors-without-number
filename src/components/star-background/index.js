import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  userUidSelector,
  isInitializedSelector,
} from 'store/selectors/base.selectors';

import { openLoginModal } from 'store/actions/user.actions';

import StarBackground from './star-background';

const mapStateToProps = createStructuredSelector({
  isInitialized: isInitializedSelector,
  uid: userUidSelector,
});

export default connect(
  mapStateToProps,
  { openLoginModal },
)(StarBackground);
