import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ChevronRight } from 'react-feather';

import FlexContainer from 'primitives/containers/flex-container';

import './style.css';

export default function SidebarLinkRow({ children, to }) {
  return (
    <Link className="SidebarLinkRow" to={to}>
      <FlexContainer>
        <FlexContainer flex="1" align="baseline">
          {children}
        </FlexContainer>
        <ChevronRight className="SidebarLinkRow-RightArrow" />
      </FlexContainer>
    </Link>
  );
}

SidebarLinkRow.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
