import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import StarBackground from 'components/star-background';
import Featured from 'components/home/featured';
import Saved from 'components/home/saved';

import { size, map, sortBy } from 'constants/lodash';
import featured from 'featured.json';

import './style.css';

export default function Home({ intl, saved, generateSector }) {
  const renderSavedSectors = () => {
    if (!size(saved)) {
      return null;
    }
    return (
      <Fragment>
        <Header type={HeaderType.header2} className="Home-SectionHeader">
          <FormattedMessage id="misc.savedSectors" />
        </Header>
        <div className="Home-Grid">
          {sortBy(
            map(saved, (data, key) => ({ key, ...data })),
            ({ created }) => {
              if (!created) {
                return -new Date();
              } else if (created.toDate) {
                return -created.toDate();
              }
              return -new Date(created);
            },
          ).map(({ key, ...data }) => (
            <Saved key={key} {...data} sector={key} />
          ))}
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <StarBackground>
        <FlexContainer
          direction="column"
          align="center"
          justify="center"
          flex="1"
          className="Home-Hero"
        >
          <div className="Home-Glitch">
            <Header
              noMargin
              type={HeaderType.header1}
              className="Home-MainHeader"
              data-text={intl.formatMessage({
                id: 'misc.sectorsWithoutNumber',
              })}
            >
              {intl.formatMessage({
                id: 'misc.sectorsWithoutNumber',
              })}
            </Header>
            <Header type={HeaderType.header2} className="Home-SubHeader">
              {intl.formatMessage({
                id: 'misc.sectorGenerator',
              })}
            </Header>
          </div>
          <FlexContainer className="Home-Actions">
            <Link to="/configure" className="Home-Action">
              <span className="Home-HexagonWrap">
                <span className="Home-Hexagon" />
              </span>
              <FormattedMessage id="misc.configure" />
            </Link>
            <button onClick={generateSector} className="Home-Action">
              <span className="Home-HexagonWrap">
                <span className="Home-Hexagon" />
              </span>
              <FormattedMessage id="misc.generate" />
            </button>
          </FlexContainer>
        </FlexContainer>
        {renderSavedSectors()}
        <Header type={HeaderType.header2} className="Home-SectionHeader">
          <FormattedMessage id="misc.featured" />
        </Header>
        <div className="Home-Grid">
          {featured.map(({ username, ...data }) => (
            <Featured key={username} {...data} />
          ))}
          <Featured
            name={intl.formatMessage({
              id: 'misc.featureWithPatreon',
            })}
          />
        </div>
      </StarBackground>
    </Fragment>
  );
}

Home.propTypes = {
  intl: intlShape.isRequired,
  saved: PropTypes.shape().isRequired,
  generateSector: PropTypes.func.isRequired,
};
