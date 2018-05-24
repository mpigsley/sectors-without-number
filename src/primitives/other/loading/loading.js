import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import ContentContainer from 'primitives/container/content-container';
import AbsoluteContainer from 'primitives/container/absolute-container';
import Header, { HeaderType } from 'primitives/text/header';
import Spinner from 'primitives/other/spinner';

export default function Loading({ message, intl }) {
  const title = message || intl.formatMessage({ id: 'misc.loading' });
  return (
    <AbsoluteContainer>
      <ContentContainer direction="column" align="center" justify="center">
        <Spinner size={100} />
        <Header type={HeaderType.header2}>{title}</Header>
      </ContentContainer>
    </AbsoluteContainer>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  intl: intlShape.isRequired,
};

Loading.defaultProps = {
  message: null,
};
