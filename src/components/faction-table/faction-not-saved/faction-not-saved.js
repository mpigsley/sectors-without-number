import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Save, LogIn } from 'react-feather';

import ContentContainer from 'primitives/container/content-container';
import Header, { HeaderType } from 'primitives/text/header';
import LinkIcon from 'primitives/other/link-icon';
import Button from 'primitives/other/button';

export default function FactionNotSaved({
  saveSector,
  openLoginModal,
  isLoggedIn,
}) {
  let action;
  if (isLoggedIn) {
    action = (
      <Button onClick={saveSector}>
        <LinkIcon icon={Save} size="20" />
        <FormattedMessage id="misc.save" />
      </Button>
    );
  } else {
    action = (
      <Button onClick={openLoginModal}>
        <LinkIcon icon={LogIn} size="20" />
        <FormattedMessage id="misc.logIn" />
      </Button>
    );
  }
  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header type={HeaderType.header2}>
        <FormattedMessage id="misc.factions" />
      </Header>
      <Header type={HeaderType.header4}>
        <FormattedMessage id="misc.factionSaveSector" />
      </Header>
      {action}
    </ContentContainer>
  );
}

FactionNotSaved.propTypes = {
  saveSector: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
