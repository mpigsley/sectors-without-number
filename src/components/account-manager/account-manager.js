import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { intlShape, FormattedMessage } from 'react-intl';

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
  intl,
}) {
  if (!isInitialized) {
    return null;
  }
  if (!user) {
    return (
      <Button className="AccountManager-Button" onClick={openLoginModal}>
        <FormattedMessage id="misc.logIn" />
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
        {user.displayName || intl.formatMessage({ id: 'misc.userAccount' })}
        <div className="AccountManager-Menu">
          <div
            className="AccountManager-Item"
            onClick={onActionClick(openEditModal)}
          >
            <FormattedMessage id="misc.editProfile" />
          </div>
          <div className="AccountManager-Item" onClick={onActionClick(logout)}>
            <FormattedMessage id="misc.logOut" />
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
  intl: intlShape.isRequired,
};

AccountManager.defaultProps = {
  user: null,
};
