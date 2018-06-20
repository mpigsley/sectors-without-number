import React from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import { FormattedMessage, intlShape } from 'react-intl';

import ExportModal from 'components/export-modal';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';
import ButtonLink from 'primitives/other/button-link';

import Entities from 'constants/entities';

import './style.css';

export default function DefaultActions({
  currentSector,
  entityType,
  children,
  isSaved,
  isShared,
  openExport,
  intl,
}) {
  const onCopy = () => {
    let url = window.location.href;
    const split = url.split('/');
    if (split.length === 7) {
      url = split.slice(0, 5).join('/');
    }
    copy(url);
    toastr.success(
      intl.formatMessage({ id: 'misc.clipboardCopy' }),
      intl.formatMessage(
        { id: 'misc.copiedLinkTo' },
        {
          entity: intl.formatMessage({
            id: Entities[entityType].name,
          }),
        },
      ),
    );
  };

  let shareButton;
  if (isSaved && !isShared) {
    shareButton = (
      <Button minimal onClick={onCopy}>
        <FormattedMessage id="misc.share" />
      </Button>
    );
  }

  return (
    <FlexContainer className="DefaultActions-Info" direction="column">
      <div className="DefaultActions-Header">
        <FlexContainer align="center" shrink="0">
          <FlexContainer flex="1" justify="center" align="flexEnd">
            <Header type={HeaderType.header2}>
              <FormattedMessage id={Entities[entityType].name} />
            </Header>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer
          justify="center"
          shrink="0"
          className="DefaultActions-SubHeader"
        >
          <ButtonLink minimal to={`/sector/${currentSector}`}>
            <FormattedMessage id="misc.back" />
          </ButtonLink>
          <span className="DefaultActions-Spacer" />
          {shareButton}
          {shareButton ? <span className="DefaultActions-Spacer" /> : null}
          <Button minimal onClick={openExport}>
            <FormattedMessage id="misc.export" />
          </Button>
        </FlexContainer>
      </div>
      <FlexContainer direction="column" flex="1" scroll>
        {children}
      </FlexContainer>

      <div className="DefaultActions-Footer">
        <FlexContainer justify="center">
          <ButtonLink
            minimal
            to="https://www.patreon.com/sectorswithoutnumber"
            target="_blank"
            className="DefaultActions-Patreon"
          >
            <FormattedMessage id="misc.becomePatron" />
          </ButtonLink>
        </FlexContainer>
      </div>
      <ExportModal />
    </FlexContainer>
  );
}

DefaultActions.propTypes = {
  currentSector: PropTypes.string.isRequired,
  entityType: PropTypes.string,
  children: PropTypes.node.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isShared: PropTypes.bool.isRequired,
  openExport: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

DefaultActions.defaultProps = {
  entityType: undefined,
};
