import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

export default function HomeFeatured({ name, sector, website }) {
  if (!sector || !website) {
    return (
      <FlexContainer
        direction="column"
        justify="spaceBetween"
        className="HomeFeatured"
      >
        <a
          href="https://www.patreon.com/sectorswithoutnumber"
          className="HomeFeatured-Patreon"
        >
          <Header
            noMargin
            type={HeaderType.header3}
            className="HomeFeatured-Title"
          >
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
      className="HomeFeatured"
    >
      <FlexContainer align="center" flex="1">
        <Header
          noMargin
          type={HeaderType.header3}
          className="HomeFeatured-Title"
        >
          {name}
        </Header>
      </FlexContainer>
      <FlexContainer>
        <Link to={`/sector/${sector}`} className="HomeFeatured-Sector">
          <FormattedMessage id="misc.sector" />
        </Link>
        <a href={website} className="HomeFeatured-Website">
          <FormattedMessage id="misc.website" />
        </a>
      </FlexContainer>
    </FlexContainer>
  );
}

HomeFeatured.propTypes = {
  name: PropTypes.string.isRequired,
  sector: PropTypes.string,
  website: PropTypes.string,
};

HomeFeatured.defaultProps = {
  sector: null,
  website: null,
};
