import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import AbsoluteContainer from 'primitives/container/absolute-container';
import StarField from 'primitives/regions/star-field';
import Button from 'primitives/other/button';

import './style.css';

export default function StarBackground({
  children,
  openLoginModal,
  isInitialized,
  uid,
}) {
  let loginButton = null;
  if (isInitialized && !uid) {
    loginButton = (
      <Button className="HexBackground-Login" onClick={openLoginModal}>
        <FormattedMessage id="misc.logIn" />
      </Button>
    );
  }

  return (
    <Fragment>
      <StarField />
      <AbsoluteContainer>
        {loginButton}
        {children}
      </AbsoluteContainer>
    </Fragment>
  );
}

StarBackground.propTypes = {
  children: PropTypes.node.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  uid: PropTypes.string,
};

StarBackground.defaultProps = {
  uid: null,
};
