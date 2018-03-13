import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router';
import { User, Home, List, Grid, LogIn, LogOut } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

export default function Navigation({
  logout,
  openEditModal,
  openLoginModal,
  isLoggedIn,
  currentSector,
  location,
}) {
  let userButton;
  let logoutButton = null;
  if (isLoggedIn) {
    userButton = (
      <span className="Navigation-Link" onClick={openEditModal}>
        <FlexContainer align="center">
          <User size="25" className="Navigation-Icon" />
          <Header type={HeaderType.header4} className="Navigation-Title">
            User Profile
          </Header>
        </FlexContainer>
      </span>
    );
    logoutButton = (
      <span className="Navigation-Link" onClick={logout}>
        <FlexContainer align="center">
          <LogOut size="25" className="Navigation-Icon" />
          <Header type={HeaderType.header4} className="Navigation-Title">
            Log Out
          </Header>
        </FlexContainer>
      </span>
    );
  } else {
    userButton = (
      <span
        className={classNames('Navigation-Link', 'Navigation-Login')}
        onClick={openLoginModal}
      >
        <FlexContainer align="center">
          <LogIn size="25" className="Navigation-Icon" />
          <Header type={HeaderType.header4} className="Navigation-Title">
            Sign Up
          </Header>
        </FlexContainer>
      </span>
    );
  }
  const route = location.pathname.split('/')[1];
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
          <FlexContainer align="center">
            <Home size="25" className="Navigation-Icon" />
            <Header type={HeaderType.header4} className="Navigation-Title">
              Home
            </Header>
          </FlexContainer>
        </Link>
        <Link
          className={classNames('Navigation-Link', {
            'Navigation-Link--active': route === 'sector',
          })}
          to={`/sector/${currentSector}`}
        >
          <FlexContainer align="center">
            <Grid size="25" className="Navigation-Icon" />
            <Header type={HeaderType.header4} className="Navigation-Title">
              Sector
            </Header>
          </FlexContainer>
        </Link>
        <Link
          className={classNames('Navigation-Link', {
            'Navigation-Link--active': route === 'overview',
          })}
          to={`/overview/${currentSector}`}
        >
          <FlexContainer align="center">
            <List size="25" className="Navigation-Icon" />
            <Header type={HeaderType.header4} className="Navigation-Title">
              Overview
            </Header>
          </FlexContainer>
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
  currentSector: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

Navigation.defaultProps = {
  currentSector: '',
};
