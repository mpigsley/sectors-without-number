import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import {
  FlexContainer,
  Header2,
} from 'primitives';
import {
  InfoContainer,
  LeftArrow,
} from './components';

export default function SidebarNavigation({ name, children, back }) {
  let backBtn = null;
  if (back) {
    backBtn = <Link to={back}><LeftArrow /></Link>;
  }
  return (
    <InfoContainer direction="column">
      <FlexContainer align="center" shrink="0">
        {backBtn}
        <FlexContainer flex="1" justify="center">
          <Header2>{name}</Header2>
        </FlexContainer>
      </FlexContainer>
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
};

SidebarNavigation.defaultProps = {
  back: null,
};
