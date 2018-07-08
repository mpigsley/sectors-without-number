import React from 'react';
import { FormattedMessage } from 'react-intl';

import ContentContainer from 'primitives/container/content-container';
import AbsoluteContainer from 'primitives/container/absolute-container';
import Header, { HeaderType } from 'primitives/text/header';
import Spinner from 'primitives/other/spinner';

export default function Loading() {
  return (
    <AbsoluteContainer>
      <ContentContainer direction="column" align="center" justify="center">
        <Spinner size={100} />
        <Header type={HeaderType.header2}>
          <FormattedMessage id="misc.loadingSector" />
        </Header>
      </ContentContainer>
    </AbsoluteContainer>
  );
}
