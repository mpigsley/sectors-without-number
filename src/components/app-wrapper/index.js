import { connect } from 'react-redux';

import { closeSyncModal } from 'store/actions/user.actions';
import {
  userLocaleSelector,
  isSyncModalOpenSelector,
  userModelLocaleSelector,
} from 'store/selectors/base.selectors';

import AppWrapper from './app-wrapper';

const mapStateToProps = state => ({
  isSyncModalOpen: isSyncModalOpenSelector(state),
  userLocale: userModelLocaleSelector(state),
  locale: userLocaleSelector(state),
});

export default connect(mapStateToProps, { closeSyncModal })(AppWrapper);
