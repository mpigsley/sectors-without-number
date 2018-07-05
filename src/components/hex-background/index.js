import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  userUidSelector,
  isInitializedSelector,
} from 'store/selectors/base.selectors';

import { openLoginModal } from 'store/actions/user.actions';

import HexBackground from './hex-background';

const mapStateToProps = createStructuredSelector({
  isInitialized: isInitializedSelector,
  uid: userUidSelector,
});

export default connect(
  mapStateToProps,
  { openLoginModal },
)(HexBackground);
