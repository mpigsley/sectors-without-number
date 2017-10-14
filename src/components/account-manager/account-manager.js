import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'primitives/other/button';

import './style.css';

export default function AccountManager({
  openLoginModal,
  toggleDropdown,
  logout,
  isFetching,
  isActive,
  user,
}) {
  if (isFetching) {
    return null;
  }
  if (user) {
    return (
      <div className="AccountManager-Button">
        <Button
          onClick={toggleDropdown}
          className={classNames('AccountManager-Dropdown', {
            'AccountManager-Dropdown--active': isActive,
          })}
          minimal
        >
          {user.displayName || 'User Account'}
          <div className="AccountManager-Menu">
            <div className="AccountManager-Item">Edit Account</div>
            <div className="AccountManager-Item" onClick={logout}>
              Log Out
            </div>
          </div>
        </Button>
      </div>
    );
  }
  return (
    <Button className="AccountManager-Button" onClick={openLoginModal}>
      Log In
    </Button>
  );
}

AccountManager.propTypes = {
  openLoginModal: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

AccountManager.defaultProps = {
  user: null,
};
