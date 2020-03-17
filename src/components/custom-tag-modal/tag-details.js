import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Lock } from 'react-feather';
import { intlShape, FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';

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

export default function TagDetails({ intl, onEdit, onDelete, selectedTag }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const {
    key,
    creator,
    core,
    name,
    description,
    types,
    ...lists
  } = selectedTag;

  let footerBtns;
  if (!core) {
    if (isConfirming) {
      footerBtns = (
        <FlexContainer
          align="center"
          justify="spaceBetween"
          className={styles.footer}
        >
          <FormattedMessage
            id="misc.toDeleteEntity"
            values={{ entity: intl.formatMessage({ id: 'misc.tag' }) }}
          />
          <FlexContainer>
            <Button
              noMargin
              disabled={isDeleting}
              className={styles.formBtn}
              onClick={() => setIsConfirming(false)}
            >
              <FormattedMessage id="misc.no" />
            </Button>
            <Button
              primary
              noMargin
              disabled={isDeleting}
              loading={isDeleting}
              className={styles.formBtn}
              onClick={() => {
                setIsDeleting(true);
                onDelete();
              }}
            >
              <FormattedMessage id="misc.yes" />
            </Button>
          </FlexContainer>
        </FlexContainer>
      );
    } else {
      footerBtns = (
        <FlexContainer
          align="center"
          justify="flexEnd"
          className={styles.footer}
        >
          <Button
            noMargin
            className={styles.formBtn}
            onClick={() => setIsConfirming(true)}
          >
            <FormattedMessage id="misc.delete" />
          </Button>
          <Button primary noMargin className={styles.formBtn} onClick={onEdit}>
            <FormattedMessage id="misc.edit" />
          </Button>
        </FlexContainer>
      );
    }
  }

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
      {footerBtns}
    </div>
  );
}

TagDetails.propTypes = {
  intl: intlShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedTag: PropTypes.shape({
    key: PropTypes.string.isRequired,
    creator: PropTypes.string,
    core: PropTypes.bool,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
