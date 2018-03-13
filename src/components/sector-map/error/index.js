import React from 'react';
import PropTypes from 'prop-types';
import { Home, Zap } from 'react-feather';

import SubContainer from 'primitives/container/sub-container';
import ContentContainer from 'primitives/container/content-container';
import AbsoluteContainer from 'primitives/container/absolute-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';
import ButtonLink from 'primitives/other/button-link';
import LinkIcon from 'primitives/other/link-icon';
import HexMap from 'components/hex-map';

import hexGenerator from 'utils/hex-generator';

export default function Error({ generateSector }) {
  const { hexes } = hexGenerator({
    renderSector: false,
    height: window.innerHeight,
    width: window.innerWidth,
  });

  return (
    <div>
      <HexMap
        height={window.innerHeight}
        width={window.innerWidth}
        hexes={hexes}
      />
      <AbsoluteContainer>
        <ContentContainer direction="column" align="center" justify="center">
          <Header type={HeaderType.header2}>Sector Does Not Exist</Header>
          <SubContainer wrap justify="center" align="center">
            <ButtonLink to="/">
              <LinkIcon icon={Home} size="20" />
              Dashboard
            </ButtonLink>
            <Button onClick={generateSector}>
              <LinkIcon icon={Zap} size="20" />
              Generate
            </Button>
          </SubContainer>
        </ContentContainer>
      </AbsoluteContainer>
    </div>
  );
}

Error.propTypes = {
  generateSector: PropTypes.func.isRequired,
};
