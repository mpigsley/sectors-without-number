import { connect } from 'react-redux';

import { closeSyncModal } from 'store/actions/user.actions';

import AppWrapper from './app-wrapper';

const mapStateToProps = ({ user }) => ({
  isSyncModalOpen: user.isSyncModalOpen,
});

const mapDispatchToProps = dispatch => ({
  closeSyncModal: () => dispatch(closeSyncModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
