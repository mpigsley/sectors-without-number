import { connect } from 'react-redux';

import {
  openLoginModal,
  toggleDropdown,
  logout,
} from 'store/actions/user.actions';

import AccountManager from './account-manager';

const mapStateToProps = state => ({
  user: state.user.model,
  isActive: state.user.isDropdownActive,
  isFetching: state.user.isFetchingState,
});

const mapDispatchToProps = dispatch => ({
  openLoginModal: () => dispatch(openLoginModal()),
  toggleDropdown: () => dispatch(toggleDropdown()),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);
