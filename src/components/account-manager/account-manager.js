import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ProfileModal from 'components/profile-modal';
import Button from 'primitives/other/button';

import './style.css';

export default function AccountManager({
  openEditModal,
  openLoginModal,
  openUserDropdown,
  closeUserDropdown,
  logout,
  isInitialized,
  isDropdownActive,
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
    if (e) e.stopPropagation();
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
      <ProfileModal />
    </div>
  );
}

AccountManager.propTypes = {
  openEditModal: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  openUserDropdown: PropTypes.func.isRequired,
  closeUserDropdown: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  isDropdownActive: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

AccountManager.defaultProps = {
  user: null,
};
