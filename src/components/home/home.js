import React from 'react';
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

import style from './style.module.scss';

export default function Home({ intl, saved, generateSector }) {
  const renderSavedSectors = () => {
    if (!size(saved)) {
      return null;
    }
    return (
      <>
        <Header type={HeaderType.header2} className={style.sectionHeader}>
          <FormattedMessage id="misc.savedSectors" />
        </Header>
        <div className={style.grid}>
          {sortBy(
            map(saved, (data, key) => ({ key, ...data })),
            ({ created }) => {
              if (!created) {
                return -new Date();
              }
              if (created.toDate) {
                return -created.toDate();
              }
              return -new Date(created);
            },
          ).map(({ key, ...data }) => (
            <Saved key={key} {...data} sector={key} />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <StarBackground>
        <FlexContainer
          direction="column"
          align="center"
          justify="center"
          flex="1"
          className={style.hero}
        >
          <div className={style.glitch}>
            <Header
              noMargin
              type={HeaderType.header1}
              className={style.mainHeader}
              data-text={intl.formatMessage({
                id: 'misc.sectorsWithoutNumber',
              })}
            >
              {intl.formatMessage({
                id: 'misc.sectorsWithoutNumber',
              })}
            </Header>
            <Header type={HeaderType.header2} className={style.subHeader}>
              {intl.formatMessage({
                id: 'misc.sectorGenerator',
              })}
            </Header>
          </div>
          <FlexContainer className={style.actions}>
            <Link to="/configure" className={style.action}>
              <span className={style.hexagonWrap}>
                <span className={style.hexagon} />
              </span>
              <FormattedMessage id="misc.configure" />
            </Link>
            <button
              type="submit"
              onClick={generateSector}
              className={style.action}
            >
              <span className={style.hexagonWrap}>
                <span className={style.hexagon} />
              </span>
              <FormattedMessage id="misc.generate" />
            </button>
            <Link to="/import" className={style.action}>
              <span className={style.hexagonWrap}>
                <span className={style.hexagon} />
              </span>
              <FormattedMessage id="misc.import" />
            </Link>
          </FlexContainer>
        </FlexContainer>
        {renderSavedSectors()}
        <Header type={HeaderType.header2} className={style.sectionHeader}>
          <FormattedMessage id="misc.featured" />
        </Header>
        <div className={style.grid}>
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
    </>
  );
}

Home.propTypes = {
  intl: intlShape.isRequired,
  saved: PropTypes.shape().isRequired,
  generateSector: PropTypes.func.isRequired,
};
