import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'primitives/other/button';
import Modal from 'primitives/modal/modal';
import Label from 'primitives/form/label';
import Input from 'primitives/form/input';

import './style.css';

export default function AccountManager({
  openEditModal,
  closeEditModal,
  openLoginModal,
  openUserDropdown,
  closeUserDropdown,
  updateUserForm,
  updateUser,
  logout,
  isEditModalOpen,
  isInitialized,
  isDropdownActive,
  displayName,
  user,
}) {
  if (!isInitialized) {
    return null;
  }
  if (!user) {
    return (
      <Button className="AccountManager-Button" onClick={openLoginModal}>
        Log In
      </Button>
    );
  }

  const onActionClick = func => e => {
    e.stopPropagation();
    func();
  };

  const toggleDropdown = isDropdownActive
    ? closeUserDropdown
    : openUserDropdown;

  return (
    <div className="AccountManager-Button">
      <Button
        onClick={onActionClick(toggleDropdown)}
        className={classNames('AccountManager-Dropdown', {
          'AccountManager-Dropdown--active': isDropdownActive,
        })}
        minimal
      >
        {user.displayName || 'User Account'}
        <div className="AccountManager-Menu">
          <div
            className="AccountManager-Item"
            onClick={onActionClick(openEditModal)}
          >
            Edit Profile
          </div>
          <div className="AccountManager-Item" onClick={onActionClick(logout)}>
            Log Out
          </div>
        </div>
      </Button>
      <Modal
        isOpen={isEditModalOpen}
        onCancel={closeEditModal}
        title="Edit Profile"
        actionButtons={[
          <Button primary key="save" onClick={updateUser}>
            Save User
          </Button>,
        ]}
      >
        <Label noPadding htmlFor="username">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          data-key="username"
          value={displayName}
          onChange={({ target }) => updateUserForm('displayName', target.value)}
        />
      </Modal>
    </div>
  );
}

AccountManager.propTypes = {
  openEditModal: PropTypes.func.isRequired,
  closeEditModal: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  openUserDropdown: PropTypes.func.isRequired,
  closeUserDropdown: PropTypes.func.isRequired,
  updateUserForm: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isEditModalOpen: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  isDropdownActive: PropTypes.bool.isRequired,
  displayName: PropTypes.string,
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

AccountManager.defaultProps = {
  user: null,
  displayName: '',
};
