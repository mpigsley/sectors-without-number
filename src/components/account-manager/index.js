import { connect } from 'react-redux';

import { openLoginModal } from 'store/actions/user.actions';

import AccountManager from './account-manager';

const mapStateToProps = state => ({
  user: state.user.model,
  isFetching: state.user.isFetchingState,
});

const mapDispatchToProps = dispatch => ({
  openLoginModal: () => {
    dispatch(openLoginModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);
