import React from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';
import ButtonLink from 'primitives/other/button-link';
import Entities from 'constants/entities';

import './style.css';

export default function EntityNavigation({
  name,
  children,
  currentSector,
  entity,
  entityType,
  activateSidebarEdit,
  deactivateSidebarEdit,
  saveEntityEdit,
  onDeleteEntity,
  saveSector,
  isSaved,
  isSynced,
  isShared,
  isSidebarEditActive,
  openExportModal,
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
        { entity: intl.formatMessage({ id: Entities[entityType].name }) },
      ),
    );
  };

  let saveButton = null;
  if (!isSaved && !isShared) {
    saveButton = (
      <Button minimal onClick={saveSector}>
        <FormattedMessage id="misc.save" />
      </Button>
    );
  }

  let editButton = null;
  if (!isShared) {
    editButton = (
      <Button minimal onClick={activateSidebarEdit}>
        <FormattedMessage id="misc.edit" />
      </Button>
    );
  }

  let shareButton = null;
  if ((isSynced || isShared) && isSaved) {
    shareButton = (
      <Button minimal onClick={onCopy}>
        <FormattedMessage id="misc.share" />
      </Button>
    );
  }

  let deleteButton = null;
  if (isSaved && !isShared) {
    deleteButton = (
      <Button minimal onClick={onDeleteEntity}>
        <FormattedMessage id="misc.delete" />
      </Button>
    );
  }

  let backUrl = '/';
  if (entity.parent) {
    backUrl = `${backUrl}sector/${currentSector}`;
    if (entity.parentEntity !== Entities.sector.key) {
      backUrl = `${backUrl}/${entity.parentEntity}/${entity.parent}`;
    }
  }

  let footer = (
    <div className="EntityNavigation-Footer">
      <FlexContainer justify="center">
        <ButtonLink
          minimal
          to="https://goo.gl/forms/eOanpGEuglCYYg7u2"
          target="_blank"
        >
          <FormattedMessage id="misc.reportProblem" />
        </ButtonLink>
        <span className="EntityNavigation-Spacer" />
        <ButtonLink minimal to="/changelog">
          <FormattedMessage id="misc.changelog" />
        </ButtonLink>
        <span className="EntityNavigation-Spacer" />
        <ButtonLink
          minimal
          to="https://github.com/mpigsley/sectors-without-number"
          target="_blank"
        >
          Github
        </ButtonLink>
        <span className="EntityNavigation-Spacer" />
        <ButtonLink
          minimal
          to="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=H3JGPZYSSK66W&lc=US&item_name=Sectors%20Without%20Number&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"
          target="_blank"
        >
          <FormattedMessage id="misc.donate" />
        </ButtonLink>
      </FlexContainer>
    </div>
  );

  let subHeader = null;
  if (!isSidebarEditActive) {
    subHeader = (
      <FlexContainer
        justify="center"
        shrink="0"
        className="EntityNavigation-SubHeader"
      >
        <ButtonLink minimal to={backUrl}>
          <FormattedMessage id="misc.back" />
        </ButtonLink>
        <span className="EntityNavigation-Spacer" />
        {saveButton}
        {saveButton ? <span className="EntityNavigation-Spacer" /> : null}
        {editButton}
        {editButton ? <span className="EntityNavigation-Spacer" /> : null}
        {deleteButton}
        {deleteButton ? <span className="EntityNavigation-Spacer" /> : null}
        {shareButton}
        {shareButton ? <span className="EntityNavigation-Spacer" /> : null}
        <Button minimal onClick={openExportModal}>
          <FormattedMessage id="misc.print" />
        </Button>
      </FlexContainer>
    );
  } else {
    footer = (
      <FlexContainer>
        <button
          className="EntityNavigation-FooterButton EntityNavigation-Cancel"
          onClick={deactivateSidebarEdit}
        >
          <FormattedMessage id="misc.cancel" />
        </button>
        <button
          className="EntityNavigation-FooterButton EntityNavigation-Save"
          onClick={saveEntityEdit}
        >
          <FormattedMessage id="misc.save" />
        </button>
      </FlexContainer>
    );
  }

  return (
    <FlexContainer className="EntityNavigation-Info" direction="column">
      <div className="EntityNavigation-Header">
        <FlexContainer align="center" shrink="0">
          <FlexContainer flex="1" justify="center" align="flexEnd">
            <Header type={HeaderType.header2}>{name}</Header>
            <Header
              type={HeaderType.header3}
              className="EntityNavigation-TypeHeader"
            >
              (<FormattedMessage id={Entities[entityType].name} />)
            </Header>
          </FlexContainer>
        </FlexContainer>
        {subHeader}
      </div>
      <FlexContainer direction="column" flex="1" scroll>
        {children}
      </FlexContainer>
      {footer}
    </FlexContainer>
  );
}

EntityNavigation.propTypes = {
  currentSector: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parent: PropTypes.string,
    parentEntity: PropTypes.string,
  }).isRequired,
  entityType: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  activateSidebarEdit: PropTypes.func.isRequired,
  deactivateSidebarEdit: PropTypes.func.isRequired,
  saveEntityEdit: PropTypes.func.isRequired,
  onDeleteEntity: PropTypes.func.isRequired,
  saveSector: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isSynced: PropTypes.bool.isRequired,
  isShared: PropTypes.bool.isRequired,
  isSidebarEditActive: PropTypes.bool.isRequired,
  openExportModal: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

EntityNavigation.defaultProps = {
  entityType: undefined,
};
