import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ChevronRight } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default function EntityLinkRow({ children, to }) {
  return (
    <Link className="EntityLinkRow" to={to}>
      <FlexContainer>
        <FlexContainer flex="1" align="baseline">
          {children}
        </FlexContainer>
        <ChevronRight className="EntityLinkRow-RightArrow" />
      </FlexContainer>
    </Link>
  );
}

EntityLinkRow.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
