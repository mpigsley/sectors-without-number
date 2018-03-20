import { connect } from 'react-redux';

import { closeSyncModal } from 'store/actions/user.actions';
import {
  isSyncModalOpenSelector,
  userLocaleSelector,
} from 'store/selectors/base.selectors';

import AppWrapper from './app-wrapper';

const mapStateToProps = state => ({
  isSyncModalOpen: isSyncModalOpenSelector(state),
  userLocale: userLocaleSelector(state),
});

export default connect(mapStateToProps, { closeSyncModal })(AppWrapper);
