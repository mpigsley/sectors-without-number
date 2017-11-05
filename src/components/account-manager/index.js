import { connect } from 'react-redux';

import {
  updateUserForm,
  updateUser,
  openEditModal,
  closeEditModal,
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
  displayName: state.user.form.displayName,
  isEditModalOpen: state.user.isEditModalOpen,
});

const mapDispatchToProps = dispatch => ({
  updateUserForm: (key, value) => dispatch(updateUserForm(key, value)),
  updateUser: () => dispatch(updateUser()),
  openEditModal: () => dispatch(openEditModal()),
  closeEditModal: () => dispatch(closeEditModal()),
  openLoginModal: () => dispatch(openLoginModal()),
  openUserDropdown: () => dispatch(openUserDropdown()),
  closeUserDropdown: () => dispatch(closeUserDropdown()),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);
