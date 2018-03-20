import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  openEditModal,
  openLoginModal,
  openUserDropdown,
  closeUserDropdown,
  logout,
} from 'store/actions/user.actions';

import AccountManager from './account-manager';

const mapStateToProps = state => ({
  user: state.user.model,
  isDropdownActive: state.user.isDropdownActive,
  isInitialized: state.user.isInitialized,
});

const mapDispatchToProps = (dispatch, props) => ({
  openEditModal: () => dispatch(openEditModal()),
  openLoginModal: () => dispatch(openLoginModal()),
  openUserDropdown: () => dispatch(openUserDropdown()),
  closeUserDropdown: () => dispatch(closeUserDropdown()),
  logout: () => dispatch(logout(props.intl)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(AccountManager),
);
