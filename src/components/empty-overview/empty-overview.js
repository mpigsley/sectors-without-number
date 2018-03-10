import React from 'react';
import PropTypes from 'prop-types';

import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default function EmptyOverview({ children }) {
  return (
    <FlexContainer
      flex="3"
      direction="column"
      align="center"
      justify="center"
      className="EmptyOverview"
    >
      <Header type={HeaderType.header2} className="EmptyOverview-Header1">
        Entity Overview
      </Header>
      <Header type={HeaderType.header3} className="EmptyOverview-Header2">
        {children}
      </Header>
    </FlexContainer>
  );
}

EmptyOverview.propTypes = {
  children: PropTypes.string,
};

EmptyOverview.defaultProps = {
  children: 'Select an entity on the left to begin',
};
