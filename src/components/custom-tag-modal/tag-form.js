import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import LabeledInput from 'primitives/form/labeled-input';
import ItemRow from 'primitives/other/item-row';
import Button from 'primitives/other/button';

import styles from './styles.module.scss';

const initialFormState = () => ({
  name: '',
  description: '',
  types: [],
  enemies: [],
  friends: [],
  complications: [],
  things: [],
});

export default function TagForm({ intl, selectedTag, onCancel }) {
  const [form, setForm] = useState(initialFormState());

  const isValid = useMemo(() => !!form.name && form.types.length, [
    form.name,
    form.types,
  ]);

  const onUpdateForm = (key, value) => {
    setForm({ ...form, [key]: value });
  };

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
        <ItemRow>
          <LabeledInput
            label={intl.formatMessage({ id: 'misc.name' })}
            value={form.name}
            isVertical
            onChange={({ target }) => onUpdateForm('name', target.value)}
          />
        </ItemRow>
        <ItemRow>
          <LabeledInput
            label={intl.formatMessage({ id: 'misc.description' })}
            value={form.description}
            rows="5"
            type="textarea"
            isVertical
            onChange={({ target }) => onUpdateForm('description', target.value)}
          />
        </ItemRow>
        <FlexContainer align="center" justify="flexEnd">
          <Button noMargin onClick={onCancel} className={styles.formBtn}>
            <FormattedMessage id="misc.cancel" />
          </Button>
          <Button
            noMargin
            primary
            disabled={!isValid}
            className={styles.formBtn}
          >
            <FormattedMessage id={selectedTag ? 'misc.edit' : 'misc.create'} />
          </Button>
        </FlexContainer>
      </div>
    </FlexContainer>
  );
}

TagForm.propTypes = {
  intl: intlShape.isRequired,
  selectedTag: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onCancel: PropTypes.func.isRequired,
};

TagForm.defaultProps = {
  selectedTag: undefined,
};
