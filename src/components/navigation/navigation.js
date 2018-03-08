import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router';
import { User, Home, Map, Grid, LogIn, LogOut } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default function Navigation({
  logout,
  openEditModal,
  openLoginModal,
  isLoggedIn,
  currentSector,
}) {
  let userButton;
  let logoutButton = null;
  if (isLoggedIn) {
    userButton = (
      <span className="Navigation-Link" onClick={openEditModal}>
        <User size="25" />
      </span>
    );
    logoutButton = (
      <span className="Navigation-Link" onClick={logout}>
        <LogOut size="25" />
      </span>
    );
  } else {
    userButton = (
      <span
        className={classNames('Navigation-Link', 'Navigation-Login')}
        onClick={openLoginModal}
      >
        <LogIn size="25" />
      </span>
    );
  }
  return (
    <FlexContainer
      className="Navigation"
      direction="column"
      align="center"
      justify="spaceBetween"
    >
      <FlexContainer
        direction="column"
        align="center"
        className="Navigation-LinkContainer"
      >
        {userButton}
        <Link className="Navigation-Link" to="/">
          <Home size="25" />
        </Link>
        <Link className="Navigation-Link" to={`/sector/${currentSector}`}>
          <Map size="25" />
        </Link>
        <Link className="Navigation-Link" to={`/summary/${currentSector}`}>
          <Grid size="25" />
        </Link>
      </FlexContainer>
      {logoutButton}
    </FlexContainer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  currentSector: PropTypes.string.isRequired,
};
