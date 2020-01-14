import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import LabeledInput from 'primitives/form/labeled-input';
import Button from 'primitives/other/button';

import { filter } from 'constants/lodash';
import Entities from 'constants/entities';

import styles from './styles.module.scss';

const initialFormState = (previous = {}) => ({
  name: '',
  description: '',
  types: [],
  enemies: [],
  friends: [],
  complications: [],
  things: [],
  ...previous,
});

export default function TagForm({ intl, selectedTag, onCancel }) {
  const [form, setForm] = useState(initialFormState(selectedTag));

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
        <LabeledInput
          isRequired
          label="misc.name"
          value={form.name}
          isVertical
          onChange={({ target }) => onUpdateForm('name', target.value)}
        />
        <LabeledInput
          label="misc.description"
          value={form.description}
          rows="5"
          type="textarea"
          isVertical
          onChange={({ target }) => onUpdateForm('description', target.value)}
        />
        <LabeledInput
          multi
          isRequired
          isVertical
          type="dropdown"
          label="misc.entityType"
          clearable={false}
          value={form.types}
          options={filter(
            Entities,
            ({ key, extraneous }) => !extraneous && key !== Entities.sector.key,
          ).map(attr => ({
            value: attr.key,
            label: intl.formatMessage({ id: attr.name }),
          }))}
          onChange={options =>
            onUpdateForm('types', options.map(option => option.value))
          }
        />
        <FlexContainer
          align="center"
          justify="flexEnd"
          className={styles.btnContainer}
        >
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
