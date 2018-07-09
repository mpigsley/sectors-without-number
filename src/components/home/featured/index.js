import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

export default function Featured({ name, sector, website }) {
  if (!sector || !website) {
    return (
      <FlexContainer
        direction="column"
        justify="spaceBetween"
        className="Featured"
      >
        <a
          href="https://www.patreon.com/sectorswithoutnumber"
          className="Featured-Patreon"
        >
          <Header noMargin type={HeaderType.header3} className="Featured-Title">
            {name}
          </Header>
        </a>
      </FlexContainer>
    );
  }
  return (
    <FlexContainer
      direction="column"
      justify="spaceBetween"
      className="Featured"
    >
      <FlexContainer align="center" flex="1">
        <Header noMargin type={HeaderType.header3} className="Featured-Title">
          {name}
        </Header>
      </FlexContainer>
      <FlexContainer>
        <Link to={`/sector/${sector}`} className="Featured-Sector">
          <FormattedMessage id="misc.sector" />
        </Link>
        <a href={website} className="Featured-Website">
          <FormattedMessage id="misc.website" />
        </a>
      </FlexContainer>
    </FlexContainer>
  );
}

Featured.propTypes = {
  name: PropTypes.string.isRequired,
  sector: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};
