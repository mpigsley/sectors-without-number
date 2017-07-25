import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import {
  FlexContainer,
  Header2,
} from 'primitives';
import {
  InfoContainer,
  HeaderContainer,
  LeftArrowIcon,
  ShareIcon,
  PrinterIcon,
  MapIcon,
  SunIcon,
  GlobeIcon,
} from './components';

export const SidebarType = {
  sector: 'sector',
  system: 'system',
  planet: 'planet',
};

export default function SidebarNavigation({ name, children, back, type }) {
  let backBtn = <LeftArrowIcon hidden />;
  if (back) {
    backBtn = <Link to={back}><LeftArrowIcon /></Link>;
  }
  const iconSize = 18;
  let typeIcon = <MapIcon hidden size={iconSize} />;
  if (type === SidebarType.sector) {
    typeIcon = <MapIcon size={iconSize} />;
  } else if (type === SidebarType.system) {
    typeIcon = <SunIcon size={iconSize} />;
  } else if (type === SidebarType.planet) {
    typeIcon = <GlobeIcon size={iconSize} />;
  }
  return (
    <InfoContainer direction="column">
      <HeaderContainer>
        <FlexContainer align="center" shrink="0">
          {backBtn}
          <FlexContainer flex="1" justify="center">
            <Header2>{name}</Header2>
          </FlexContainer>
          {typeIcon}
        </FlexContainer>
        <FlexContainer justify="center" shrink="0">
          <ShareIcon size={18} />
          <PrinterIcon size={18} />
        </FlexContainer>
      </HeaderContainer>
      <FlexContainer direction="column" scroll>
        {children}
      </FlexContainer>
    </InfoContainer>
  );
}

SidebarNavigation.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  back: PropTypes.string,
  type: PropTypes.string,
};

SidebarNavigation.defaultProps = {
  type: SidebarType.sector,
  back: null,
};
