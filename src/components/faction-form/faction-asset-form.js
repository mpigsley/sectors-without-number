import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import DeletableRow from 'primitives/form/deletable-row';
import LabeledInput from 'primitives/form/labeled-input';
import ItemRow from 'primitives/other/item-row';
import Input from 'primitives/form/input';

import { map } from 'constants/lodash';
import { FACTION_ASSETS } from 'constants/faction';

const ASSET_OPTIONS = map(FACTION_ASSETS, ({ name, key }) => ({
  label: name,
  value: key,
}));

export default function FactionAssetForm({
  onDelete,
  onUpdate,
  type,
  hitPoints,
  location,
  homeworlds,
}) {
  return (
    <DeletableRow onAction={onDelete}>
      <FlexContainer direction="column">
        <Input
          type="dropdown"
          clearable={false}
          value={type}
          options={ASSET_OPTIONS}
          onChange={({ value }) => onUpdate({ type: value })}
        />
        <ItemRow>
          <LabeledInput
            type="number"
            label="misc.hitPoints"
            value={hitPoints}
            onChange={({ target }) => onUpdate({ hitPoints: target.value })}
          />
          <LabeledInput
            type="dropdown"
            label="misc.location"
            value={location}
            options={homeworlds}
            onChange={({ value }) => onUpdate({ location: value })}
          />
        </ItemRow>
      </FlexContainer>
    </DeletableRow>
  );
}

FactionAssetForm.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  type: PropTypes.string,
  hitPoints: PropTypes.number.isRequired,
  location: PropTypes.string,
  homeworlds: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

FactionAssetForm.defaultProps = {
  type: undefined,
  location: undefined,
};
