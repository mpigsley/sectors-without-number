import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ChevronRight } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

export default function LinkRow({ to, title, additional }) {
  return (
    <Link className="LinkRow" to={to}>
      <FlexContainer justify="spaceBetween" flex="1">
        <FlexContainer flex="1" align="baseline">
          <Header type={HeaderType.header4} className="LinkRow-Name">
            {title}
          </Header>
          {additional && (
            <div className="LinkRow-Additional">({additional})</div>
          )}
        </FlexContainer>
        <ChevronRight className="LinkRow-RightArrow" />
      </FlexContainer>
    </Link>
  );
}

LinkRow.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  additional: PropTypes.string,
};

LinkRow.defaultProps = {
  additional: null,
};
