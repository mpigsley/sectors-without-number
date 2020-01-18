import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';

import { Lock } from 'constants/icons';
import { map } from 'constants/lodash';

import styles from './styles.module.scss';

const renderList = (rows, key) => (
  <div key={key} className={styles.content}>
    <b>
      <FormattedMessage id={`misc.${key}`} />:
    </b>
    <ul className={styles.contentList}>
      {rows.map((row, i) => (
        <li key={`${key}-${i}`}>{row}</li> // eslint-disable-line
      ))}
    </ul>
  </div>
);

export default function TagDetails({ intl, onEdit, selectedTag }) {
  const {
    key,
    creator,
    core,
    name,
    description,
    types,
    ...lists
  } = selectedTag;
  return (
    <div className={styles.detailsContainer}>
      <Header type={HeaderType.header2}>{name}</Header>
      <FlexContainer justify="center">
        <span>
          {core && (
            <Lock
              size={20}
              className={styles.detailsIcon}
              data-rh={intl.formatMessage({ id: 'misc.coreTag' })}
              data-rh-at="bottom"
            />
          )}
        </span>
      </FlexContainer>
      <p>{description}</p>
      <p>
        <b className={styles.entityTypes}>
          <FormattedMessage id="misc.entityType" />:
        </b>
        {types
          .map(type => intl.formatMessage({ id: `entity.${type}` }))
          .join(', ')}
      </p>
      {map(lists, renderList)}
      {!core && (
        <FlexContainer
          align="center"
          justify="flexEnd"
          className={styles.footer}
        >
          <Button noMargin className={styles.formBtn} onClick={() => {}}>
            <FormattedMessage id="misc.delete" />
          </Button>
          <Button primary noMargin className={styles.formBtn} onClick={onEdit}>
            <FormattedMessage id="misc.edit" />
          </Button>
        </FlexContainer>
      )}
    </div>
  );
}

TagDetails.propTypes = {
  intl: intlShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  selectedTag: PropTypes.shape({
    key: PropTypes.string.isRequired,
    creator: PropTypes.string,
    core: PropTypes.bool,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
