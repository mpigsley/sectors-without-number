import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import DeletableRow from 'primitives/form/deletable-row';
import LabeledInput from 'primitives/form/labeled-input';
import ItemRow from 'primitives/other/item-row';
import Input from 'primitives/form/input';

import { find, filter, sortBy } from 'constants/lodash';
import { FACTION_ASSETS } from 'constants/faction';
import { EyeOff } from 'constants/icons';

export default function FactionAssetForm({
  intl,
  onDelete,
  onUpdate,
  type,
  hitPoints,
  location,
  homeworlds,
  attributes,
  stealthed,
}) {
  const filteredOptions = filter(
    FACTION_ASSETS,
    ({ category, rating }) => rating <= (attributes[category] || 8),
  );
  const allOptions = filteredOptions;
  if (type && !find(allOptions, { type })) {
    allOptions.push(FACTION_ASSETS[type]);
  }
  const assetOptions = sortBy(
    allOptions.map(({ key }) => ({
      label: intl.formatMessage({ id: `faction.assets.${key}` }),
      value: key,
    })),
    'label',
  );

  let assetHitPoints;
  if (type && FACTION_ASSETS[type]) {
    assetHitPoints = ` (${FACTION_ASSETS[type].hp || '-'})`;
  }

  return (
    <DeletableRow className="FactionAssetForm" onAction={onDelete}>
      <FlexContainer direction="column" flex="1">
        <Input
          dropUp
          type="dropdown"
          clearable={false}
          value={type}
          options={assetOptions}
          onChange={({ value }) => onUpdate({ type: value })}
        />
        <ItemRow className="FactionAssetForm-Row">
          <LabeledInput
            isVertical
            type="number"
            disabled={!(FACTION_ASSETS[type] || {}).hp}
            label={
              <span>
                <FormattedMessage id="misc.hitPoints" />
                {assetHitPoints}
              </span>
            }
            value={hitPoints}
            onChange={({ target }) => {
              const val = parseInt(target.value, 10);
              onUpdate({ hitPoints: Number.isNaN(val) ? 0 : val });
            }}
          />
          <LabeledInput
            dropUp
            isVertical
            type="dropdown"
            label="misc.location"
            value={location}
            options={homeworlds}
            onChange={({ value }) => onUpdate({ location: value })}
          />
          <LabeledInput
            isVertical
            className="FactionAssetForm-IconInput"
            type="checkbox"
            label={<EyeOff className="FactionAssetForm-IconLabel" size={16} />}
            checked={stealthed}
            onChange={({ target } = {}) =>
              onUpdate({ stealthed: target.checked })
            }
          />
        </ItemRow>
      </FlexContainer>
    </DeletableRow>
  );
}

FactionAssetForm.propTypes = {
  intl: intlShape.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  type: PropTypes.string,
  hitPoints: PropTypes.number.isRequired,
  location: PropTypes.string,
  stealthed: PropTypes.bool.isRequired,
  homeworlds: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  attributes: PropTypes.shape({
    force: PropTypes.number.isRequired,
    cunning: PropTypes.number.isRequired,
    wealth: PropTypes.number.isRequired,
  }).isRequired,
};

FactionAssetForm.defaultProps = {
  type: undefined,
  location: undefined,
};
