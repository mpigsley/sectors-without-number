import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  User,
  Home,
  List,
  Grid,
  LogIn,
  LogOut,
  Package,
} from 'constants/icons';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

export default function Navigation({
  logout,
  openEditModal,
  openLoginModal,
  isLoggedIn,
  isSharedSector,
  currentSector,
  location,
  lastOverviewEntity,
}) {
  let userButton;
  let logoutButton = null;
  if (isLoggedIn) {
    userButton = (
      <span className="Navigation-Link" onClick={openEditModal}>
        <FlexContainer align="center">
          <User size="25" className="Navigation-Icon" />
          <Header type={HeaderType.header4} className="Navigation-Title">
            <FormattedMessage id="misc.userProfile" />
          </Header>
        </FlexContainer>
      </span>
    );
    logoutButton = (
      <span className="Navigation-Link" onClick={logout}>
        <FlexContainer align="center">
          <LogOut size="25" className="Navigation-Icon" />
          <Header type={HeaderType.header4} className="Navigation-Title">
            <FormattedMessage id="misc.logOut" />
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
            <FormattedMessage id="misc.signUp" />
          </Header>
        </FlexContainer>
      </span>
    );
  }

  let elementsBtn;
  if (!isSharedSector) {
    elementsBtn = (
      <Link
        className={classNames('Navigation-Link', 'Navigation-Login')}
        to="/elements"
      >
        <FlexContainer align="center">
          <Package size="25" className="Navigation-Icon" />
          <Header type={HeaderType.header4} className="Navigation-Title">
            <FormattedMessage id="misc.elements" />
          </Header>
        </FlexContainer>
      </Link>
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
              <FormattedMessage id="misc.home" />
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
              <FormattedMessage id="misc.sector" />
            </Header>
          </FlexContainer>
        </Link>
        <Link
          className={classNames('Navigation-Link', {
            'Navigation-Link--active': route === 'overview',
          })}
          to={`/overview/${currentSector}${
            lastOverviewEntity ? `/${lastOverviewEntity}` : ''
          }`}
        >
          <FlexContainer align="center">
            <List size="25" className="Navigation-Icon" />
            <Header type={HeaderType.header4} className="Navigation-Title">
              <FormattedMessage id="misc.overview" />
            </Header>
          </FlexContainer>
        </Link>
        {elementsBtn}
      </FlexContainer>
      {logoutButton}
    </FlexContainer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isSharedSector: PropTypes.bool.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  currentSector: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  lastOverviewEntity: PropTypes.string,
};

Navigation.defaultProps = {
  currentSector: '',
  lastOverviewEntity: null,
};
