import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ContentContainer from 'primitives/container/content-container';
import Header, { HeaderType } from 'primitives/text/header';
import LinkIcon from 'primitives/other/link-icon';
import Button from 'primitives/other/button';

import { Save } from 'constants/icons';

export default function FactionNotSaved({ saveSector }) {
  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header type={HeaderType.header2}>
        <FormattedMessage id="misc.factions" />
      </Header>
      <Header type={HeaderType.header4}>
        <FormattedMessage id="misc.factionSaveSector" />
      </Header>
      <Button onClick={saveSector}>
        <LinkIcon icon={Save} size="20" />
        <FormattedMessage id="misc.save" />
      </Button>
    </ContentContainer>
  );
}

FactionNotSaved.propTypes = {
  saveSector: PropTypes.func.isRequired,
};
