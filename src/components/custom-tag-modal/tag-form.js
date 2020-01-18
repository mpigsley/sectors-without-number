import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';
import LabeledInput from 'primitives/form/labeled-input';
import DeletableRow from 'primitives/form/deletable-row';
import Button from 'primitives/other/button';
import Input from 'primitives/form/input';

import { filter, find } from 'constants/lodash';
import Entities from 'constants/entities';
import { createId } from 'utils/common';

import styles from './styles.module.scss';

const initialArrayState = array =>
  (array || []).map(value => ({ key: createId(), value }));

const initialFormState = (previous = {}) => ({
  name: '',
  description: '',
  types: [Entities.planet.key],
  ...previous,
  enemies: initialArrayState(previous.enemies),
  friends: initialArrayState(previous.friends),
  complications: initialArrayState(previous.complications),
  things: initialArrayState(previous.things),
  places: initialArrayState(previous.places),
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

  const renderExpandableArray = (typeKey, singularKey) => {
    const onAddItemToArray = () => {
      if (!find(form[typeKey], item => item.value === '')) {
        onUpdateForm(typeKey, [
          ...form[typeKey],
          { key: createId(), value: '' },
        ]);
      }
    };

    const onUpdateItemInArray = (rowKey, value) =>
      onUpdateForm(
        typeKey,
        form[typeKey].map(item =>
          item.key === rowKey ? { ...item, value } : item,
        ),
      );

    const onDeleteItemFromArary = rowKey =>
      onUpdateForm(typeKey, form[typeKey].filter(item => item.key !== rowKey));

    return (
      <FlexContainer key={typeKey} direction="column">
        <SectionHeader
          header={`misc.${typeKey}`}
          addItemName={`misc.${singularKey}`}
          className={styles.formHeader}
          onAdd={() => onAddItemToArray()}
        />
        {form[typeKey].map(row => (
          <DeletableRow
            key={row.key}
            align="center"
            className={styles.deletableRow}
            onAction={() => onDeleteItemFromArary(row.key)}
          >
            <Input
              value={row.value}
              onChange={({ target }) =>
                onUpdateItemInArray(row.key, target.value)
              }
            />
          </DeletableRow>
        ))}
      </FlexContainer>
    );
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
        {renderExpandableArray('enemies', 'enemy')}
        {renderExpandableArray('friends', 'friend')}
        {renderExpandableArray('complications', 'complication')}
        {renderExpandableArray('things', 'thing')}
        {renderExpandableArray('places', 'place')}
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
