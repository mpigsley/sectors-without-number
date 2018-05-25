import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import HexBackground from 'components/hex-background';
import LinkRow from 'primitives/other/link-row';
import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/container/content-container';
import FlexContainer from 'primitives/container/flex-container';
import SubContainer from 'primitives/container/sub-container';
import LinkIcon from 'primitives/other/link-icon';
import ButtonLink from 'primitives/other/button-link';
import Button from 'primitives/other/button';

import { Settings, Zap } from 'constants/icons';
import { sortByKey } from 'utils/common';

import './style.css';

export default function Home({ saved, generateSector }) {
  const renderSaved = () => {
    if (Object.keys(saved).length === 0) {
      return null;
    }
    return (
      <SubContainer wrap direction="row" className="Home-Saved">
        <FlexContainer
          direction="column"
          align="flexEnd"
          className="Home-SavedTitleContainer"
        >
          <Header type={HeaderType.header3} className="Home-SavedTitle">
            <FormattedMessage id="misc.savedSectors" />
          </Header>
          <div className="Home-SavedSecondary">
            <FormattedMessage id="misc.selectSector" />
          </div>
        </FlexContainer>
        <FlexContainer direction="column" className="Home-SavedList">
          {Object.keys(saved)
            .map(key => ({ key, ...saved[key] }))
            .sort(sortByKey('name'))
            .map(({ key, name, rows, columns }) => (
              <LinkRow
                key={key}
                to={`/sector/${key}`}
                title={name}
                additional={`${columns}, ${rows}`}
              />
            ))}
        </FlexContainer>
      </SubContainer>
    );
  };

  return (
    <HexBackground>
      <ContentContainer direction="column" align="center" justify="center">
        <Header type={HeaderType.header1}>
          <FormattedMessage id="misc.sectorsWithoutNumber" />
        </Header>
        <SubContainer fullWidth justify="center" align="center">
          <div className="Home-RowContainer">
            <div className="Home-Row Home-Row--left" />
          </div>
          <Header type={HeaderType.header2}>
            <FormattedMessage id="misc.sectorGenerator" />
          </Header>
          <div className="Home-RowContainer">
            <div className="Home-Row" />
          </div>
        </SubContainer>
        {renderSaved()}
        <SubContainer wrap justify="center" align="center">
          <ButtonLink to="/configure">
            <LinkIcon icon={Settings} size="20" />
            <FormattedMessage id="misc.configure" />
          </ButtonLink>
          <Button onClick={generateSector}>
            <LinkIcon icon={Zap} size="20" />
            <FormattedMessage id="misc.generate" />
          </Button>
        </SubContainer>
      </ContentContainer>
    </HexBackground>
  );
}

Home.propTypes = {
  saved: PropTypes.shape().isRequired,
  generateSector: PropTypes.func.isRequired,
};
