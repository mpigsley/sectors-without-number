import React from 'react';
import PropTypes from 'prop-types';

import Button from 'primitives/other/button';

import './style.css';

export default function AccountManager({ openLoginModal, isFetching, user }) {
  if (isFetching) {
    return null;
  }
  if (user) {
    return (
      <Button className="AccountManager-Button" minimal>
        {user.displayName || 'User Account'}
      </Button>
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
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

AccountManager.defaultProps = {
  user: null,
};
