import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import StarBackground from 'components/star-background';
import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/container/content-container';
import FlexContainer from 'primitives/container/flex-container';

import './style.scss';

export default function LegalPage({ titleId, effectiveDate, children }) {
  return (
    <StarBackground>
      <ContentContainer align="flexStart" justify="center">
        <FlexContainer className="LegalPage" direction="column">
          <Header className="LegalPage-Header" type={HeaderType.header2}>
            <FormattedMessage id={titleId} />
          </Header>
          <p className="LegalPage-Date">Effective {effectiveDate}</p>
          {children}
          <FlexContainer className="LegalPage-Footer" justify="center">
            <Link className="LegalPage-Link" to="/">
              <FormattedMessage id="misc.home" />
            </Link>
            <Link className="LegalPage-Link" to="/privacy">
              <FormattedMessage id="misc.privacyPolicy" />
            </Link>
            <Link className="LegalPage-Link" to="/terms">
              <FormattedMessage id="misc.termsOfService" />
            </Link>
          </FlexContainer>
        </FlexContainer>
      </ContentContainer>
    </StarBackground>
  );
}

LegalPage.propTypes = {
  titleId: PropTypes.string.isRequired,
  effectiveDate: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
