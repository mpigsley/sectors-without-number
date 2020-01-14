import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';

import styles from './styles.module.scss';

export default function TagForm({ selectedTag, onCancel }) {
  return (
    <FlexContainer flex="1" direction="column">
      <div className={styles.detailsContainer}>
        <Header type={HeaderType.header2}>
          {selectedTag ? (
            <FormattedMessage
              id="misc.editEntity"
              values={{ entity: selectedTag.name }}
            />
          ) : (
            <FormattedMessage id="misc.createTag" />
          )}
        </Header>
        <FlexContainer align="center" justify="flexEnd">
          <Button noMargin onClick={onCancel} className={styles.formBtn}>
            <FormattedMessage id="misc.cancel" />
          </Button>
          <Button noMargin primary className={styles.formBtn}>
            <FormattedMessage id={selectedTag ? 'misc.edit' : 'misc.create'} />
          </Button>
        </FlexContainer>
      </div>
    </FlexContainer>
  );
}

TagForm.propTypes = {
  selectedTag: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onCancel: PropTypes.func.isRequired,
};

TagForm.defaultProps = {
  selectedTag: undefined,
};
