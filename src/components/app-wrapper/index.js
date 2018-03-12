import { connect } from 'react-redux';

import { closeSyncModal } from 'store/actions/user.actions';
import {
  isSyncModalOpenSelector,
  localeSelector,
} from 'store/selectors/base.selectors';

import AppWrapper from './app-wrapper';

const mapStateToProps = state => ({
  isSyncModalOpen: isSyncModalOpenSelector(state),
  locale: localeSelector(state),
});

export default connect(mapStateToProps, { closeSyncModal })(AppWrapper);
