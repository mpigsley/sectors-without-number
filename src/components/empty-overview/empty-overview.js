import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import Loading from 'primitives/regions/loading';

import './style.scss';

export default function EmptyOverview({ children, isInitialized }) {
  let body = <Loading />;
  if (isInitialized) {
    body = (
      <>
        >
        <Header type={HeaderType.header2} className="EmptyOverview-Header1">
          <FormattedMessage id="misc.entityOverview" />
        </Header>
        <Header type={HeaderType.header3} className="EmptyOverview-Header2">
          {children || <FormattedMessage id="misc.selectEntity" />}
        </Header>
      </>
    );
  }
  return (
    <FlexContainer
      flex="3"
      direction="column"
      align="center"
      justify="center"
      className="EmptyOverview"
    >
      {body}
    </FlexContainer>
  );
}

EmptyOverview.propTypes = {
  children: PropTypes.node,
  isInitialized: PropTypes.bool.isRequired,
};

EmptyOverview.defaultProps = {
  children: undefined,
};
