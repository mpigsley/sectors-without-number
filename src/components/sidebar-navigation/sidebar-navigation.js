import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import {
  ChevronLeft,
  Share,
  Printer,
  Sun,
  Globe,
  Map,
  AlertCircle,
  Save,
} from 'react-feather';

import FlexContainer from 'primitives/containers/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

const linkCss = 'SidebarNavigation-Icon SidebarNavigation-Icon--link';
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
  currentSector,
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

  let shareIcon = null;
  if (currentSector === 'generated') {
    shareIcon = <Share className={linkCss} onClick={onCopy} size={18} />;
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
            <ChevronLeft className={linkCss} />
          </Link>
          <FlexContainer flex="1" justify="center">
            <Header type={HeaderType.header2}>
              {name}
            </Header>
          </FlexContainer>
          {typeIcon}
        </FlexContainer>
        <FlexContainer justify="center" shrink="0">
          <Save className={linkCss} onClick={saveSector} size={18} />
          {shareIcon}
          <Printer className={linkCss} onClick={onPrint} size={18} />
          <Link to="https://goo.gl/forms/eOanpGEuglCYYg7u2" target="_blank">
            <AlertCircle className={linkCss} size={18} />
          </Link>
        </FlexContainer>
      </div>
      <FlexContainer direction="column" flex="1" scroll>
        {children}
      </FlexContainer>
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
};

SidebarNavigation.defaultProps = {
  type: SidebarType.sector,
  back: null,
  currentSector: null,
};
