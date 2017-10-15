import { connect } from 'react-redux';

import {
  updateUserForm,
  updateUser,
  openEditModal,
  closeEditModal,
  openLoginModal,
  toggleDropdown,
  logout,
} from 'store/actions/user.actions';

import AccountManager from './account-manager';

const mapStateToProps = state => ({
  user: state.user.model,
  isActive: state.user.isDropdownActive,
  isFetching: state.user.isFetchingState,
  displayName: state.user.form.displayName,
  isEditModalOpen: state.user.isEditModalOpen,
});

const mapDispatchToProps = dispatch => ({
  updateUserForm: (key, value) => dispatch(updateUserForm(key, value)),
  updateUser: () => dispatch(updateUser()),
  openEditModal: () => dispatch(openEditModal()),
  closeEditModal: () => dispatch(closeEditModal()),
  openLoginModal: () => dispatch(openLoginModal()),
  toggleDropdown: () => dispatch(toggleDropdown()),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);
