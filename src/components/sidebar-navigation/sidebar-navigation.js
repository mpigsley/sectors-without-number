import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import { ChevronLeft, Sun, Globe, Map } from 'react-feather';

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
  currentSector,
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

  let shareButton = null;
  if (currentSector === 'generated') {
    shareButton = (
      <Button minimal onClick={onCopy}>
        Share
      </Button>
    );
  }

  let deleteButton = null;
  if (onDelete) {
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

  return (
    <FlexContainer className="SidebarNavigation-Info" direction="column">
      <div className="SidebarNavigation-Header">
        <FlexContainer align="center" shrink="0">
          <Link to={back || '/'} className="SidebarNavigation-Link">
            <ChevronLeft className="SidebarNavigation-Icon SidebarNavigation-Icon--link" />
          </Link>
          <FlexContainer flex="1" justify="center">
            <Header type={HeaderType.header2}>{name}</Header>
          </FlexContainer>
          {typeIcon}
        </FlexContainer>
        <FlexContainer justify="center" shrink="0">
          <Button minimal onClick={saveSector}>
            Save
          </Button>
          <span className="SidebarNavigation-Spacer" />
          <Button minimal onClick={onEdit}>
            Edit
          </Button>
          {onDelete ? <span className="SidebarNavigation-Spacer" /> : null}
          {deleteButton}
          <span className="SidebarNavigation-Spacer" />
          {shareButton}
          {currentSector === 'generated' ? (
            <span className="SidebarNavigation-Spacer" />
          ) : null}
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
            Changelog
          </ButtonLink>
          <span className="SidebarNavigation-Spacer" />
          <ButtonLink
            minimal
            to="https://github.com/mpigsley/sectors-without-number"
            target="_blank"
          >
            Github
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
  currentSector: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

SidebarNavigation.defaultProps = {
  type: SidebarType.sector,
  back: null,
  currentSector: null,
  onEdit: () => {},
  onDelete: null,
};
