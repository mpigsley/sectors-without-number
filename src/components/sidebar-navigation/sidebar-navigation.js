import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import { ChevronLeft, Sun, Globe, Map, Home } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';
import ButtonLink from 'primitives/other/button-link';

import './style.css';

const nonLinkCss = 'SidebarNavigation-Icon SidebarNavigation-Icon--nonlink';
export const SidebarType = {
  sector: 'sector',
  system: 'system',
  planet: 'planet',
};

export default function SidebarNavigation({
  name,
  children,
  back,
  type,
  saveSector,
  onDelete,
  isSaved,
  isSynced,
  isCloudSave,
  onEdit,
}) {
  const onCopy = () => {
    copy(window.location.href);
    toastr.success(
      'Copied to Clipboard',
      `You have copied a link directly to this ${type}.`,
    );
  };

  const onPrint = () => {
    window.print();
  };

  let saveButton = null;
  if (!isSaved && !isCloudSave) {
    saveButton = (
      <Button minimal onClick={saveSector}>
        Save
      </Button>
    );
  }

  let editButton = null;
  if (onEdit && !isCloudSave) {
    editButton = (
      <Button minimal onClick={onEdit}>
        Edit
      </Button>
    );
  }

  let shareButton = null;
  if ((isSynced || isCloudSave) && isSaved) {
    shareButton = (
      <Button minimal onClick={onCopy}>
        Share
      </Button>
    );
  }

  let deleteButton = null;
  if (onDelete && !isCloudSave) {
    deleteButton = (
      <Button minimal onClick={onDelete}>
        Delete
      </Button>
    );
  }

  const iconSize = 18;
  let typeIcon = <Map className={nonLinkCss} hidden size={iconSize} />;
  if (type === SidebarType.sector) {
    typeIcon = <Map className={nonLinkCss} size={iconSize} />;
  } else if (type === SidebarType.system) {
    typeIcon = <Sun className={nonLinkCss} size={iconSize} />;
  } else if (type === SidebarType.planet) {
    typeIcon = <Globe className={nonLinkCss} size={iconSize} />;
  }

  let backIcon = (
    <ChevronLeft className="SidebarNavigation-Icon SidebarNavigation-Icon--link" />
  );
  if (type === SidebarType.sector) {
    backIcon = (
      <Home
        size={20}
        className="SidebarNavigation-Icon SidebarNavigation-Icon--link"
      />
    );
  }

  return (
    <FlexContainer className="SidebarNavigation-Info" direction="column">
      <div className="SidebarNavigation-Header">
        <FlexContainer align="center" shrink="0">
          <Link to={back || '/'} className="SidebarNavigation-Link">
            {backIcon}
          </Link>
          <FlexContainer flex="1" justify="center">
            <Header type={HeaderType.header2}>{name}</Header>
          </FlexContainer>
          {typeIcon}
        </FlexContainer>
        <FlexContainer justify="center" shrink="0">
          {saveButton}
          {saveButton ? <span className="SidebarNavigation-Spacer" /> : null}
          {editButton}
          {editButton ? <span className="SidebarNavigation-Spacer" /> : null}
          {deleteButton}
          {deleteButton ? <span className="SidebarNavigation-Spacer" /> : null}
          {shareButton}
          {shareButton ? <span className="SidebarNavigation-Spacer" /> : null}
          <Button minimal onClick={onPrint}>
            Print
          </Button>
        </FlexContainer>
      </div>
      <FlexContainer direction="column" flex="1" scroll>
        {children}
      </FlexContainer>
      <div className="SidebarNavigation-Footer">
        <FlexContainer justify="center">
          <ButtonLink
            minimal
            to="https://goo.gl/forms/eOanpGEuglCYYg7u2"
            target="_blank"
          >
            Report Problem
          </ButtonLink>
          <span className="SidebarNavigation-Spacer" />
          <ButtonLink minimal to="/changelog">
            Changlog
          </ButtonLink>
          <span className="SidebarNavigation-Spacer" />
          <ButtonLink
            minimal
            to="https://github.com/mpigsley/sectors-without-number"
            target="_blank"
          >
            Github
          </ButtonLink>
          <span className="SidebarNavigation-Spacer" />
          <ButtonLink
            minimal
            to="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=H3JGPZYSSK66W&lc=US&item_name=Sectors%20Without%20Number&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"
            target="_blank"
          >
            Donate
          </ButtonLink>
        </FlexContainer>
      </div>
    </FlexContainer>
  );
}

SidebarNavigation.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  back: PropTypes.string,
  type: PropTypes.string,
  saveSector: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isSynced: PropTypes.bool.isRequired,
  isCloudSave: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

SidebarNavigation.defaultProps = {
  type: SidebarType.sector,
  back: null,
  onEdit: null,
  onDelete: null,
};
