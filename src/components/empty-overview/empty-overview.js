import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import OverviewList from 'components/overview-list';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import Spinner from 'primitives/other/spinner';

import './style.css';

export default function EmptyOverview({ children, isInitialized }) {
  let body = <Spinner size={100} />;
  if (isInitialized) {
    body = (
      <Fragment>
        <Header type={HeaderType.header2} className="EmptyOverview-Header1">
          Entity Overview
        </Header>
        <Header type={HeaderType.header3} className="EmptyOverview-Header2">
          {children || 'Select an entity on the left to begin'}
        </Header>
      </Fragment>
    );
  }
  return (
    <OverviewList>
      <FlexContainer
        flex="3"
        direction="column"
        align="center"
        justify="center"
        className="EmptyOverview"
      >
        {body}
      </FlexContainer>
    </OverviewList>
  );
}

EmptyOverview.propTypes = {
  children: PropTypes.node,
  isInitialized: PropTypes.bool.isRequired,
};

EmptyOverview.defaultProps = {
  children: undefined,
};
