import React from 'react';
import PropTypes from 'prop-types';

import { FlexContainer } from 'primitives';
import {
  LinkContainer,
  RightArrow,
  LinkRow,
} from './components';

export default function SidebarLinkRow({ children, to }) {
  return (
    <LinkRow to={to}>
      <FlexContainer>
        <LinkContainer align="baseline">
          {children}
        </LinkContainer>
        <RightArrow />
      </FlexContainer>
    </LinkRow>
  );
}

SidebarLinkRow.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
