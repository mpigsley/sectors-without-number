import React from 'react';
import PropTypes from 'prop-types';
import { Settings, Zap } from 'react-feather';

import { stringSortByKey } from 'utils/common';
import SidebarLinkRow from 'components/sidebar-link-row';
import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/container/content-container';
import FlexContainer from 'primitives/container/flex-container';
import SubContainer from 'primitives/container/sub-container';
import LinkIcon from 'primitives/other/link-icon';
import ButtonLink from 'primitives/other/button-link';
import Button from 'primitives/other/button';

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
            Saved Sectors
          </Header>
          <div className="Home-SavedSecondary">Select a sector to begin.</div>
        </FlexContainer>
        <FlexContainer direction="column" className="Home-SavedList">
          {Object.keys(saved)
            .map(key => ({ key, ...saved[key] }))
            .sort(stringSortByKey('name'))
            .map(({ key, name, rows, columns }) => (
              <SidebarLinkRow key={key} to={`/sector/${key}`}>
                <span className="Home-SavedName">{name}</span>
                <span className="Home-SavedSecondary">
                  ({columns}, {rows})
                </span>
              </SidebarLinkRow>
            ))}
        </FlexContainer>
      </SubContainer>
    );
  };

  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header type={HeaderType.header1}>Sectors Without Number</Header>
      <SubContainer fullWidth justify="center" align="center">
        <div className="Home-RowContainer">
          <div className="Home-Row Home-Row--left" />
        </div>
        <Header type={HeaderType.header2}>Sector Generator</Header>
        <div className="Home-RowContainer">
          <div className="Home-Row" />
        </div>
      </SubContainer>
      {renderSaved()}
      <SubContainer wrap justify="center" align="center">
        <ButtonLink to="/configure">
          <LinkIcon icon={Settings} size="20" />
          Configure
        </ButtonLink>
        <Button onClick={generateSector}>
          <LinkIcon icon={Zap} size="20" />
          Generate
        </Button>
      </SubContainer>
    </ContentContainer>
  );
}

Home.propTypes = {
  saved: PropTypes.shape().isRequired,
  generateSector: PropTypes.func.isRequired,
};
