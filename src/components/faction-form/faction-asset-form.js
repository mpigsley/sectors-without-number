import React from 'react';
import PropTypes from 'prop-types';
import { EyeOff } from 'react-feather';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import DeletableRow from 'primitives/form/deletable-row';
import LabeledInput from 'primitives/form/labeled-input';
import ItemRow from 'primitives/other/item-row';
import Input from 'primitives/form/input';

import { find, filter, sortBy, map } from 'constants/lodash';
import { FACTION_ASSETS } from 'constants/faction';
import Entities from 'constants/entities';

import styles from './styles.module.scss';

const ReactHint = ReactHintFactory(React);

export default function FactionAssetForm({
  intl,
  onDelete,
  onUpdate,
  type,
  hitPoints,
  location,
  locationEntity,
  currentEntities,
  attributes,
  stealthed,
}) {
  const filteredOptions = filter(
    FACTION_ASSETS,
    ({ category, rating }) => rating <= (attributes[category] || 8),
  );
  const allOptions = filteredOptions;
  if (type && !find(allOptions, { key: type })) {
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
    <DeletableRow className={styles.container} onAction={onDelete}>
      <FlexContainer direction="column" flex="1">
        <ItemRow className={styles.topRow}>
          <LabeledInput
            dropUp
            isVertical
            type="dropdown"
            clearable={false}
            label="misc.asset"
            value={type}
            options={assetOptions}
            onChange={({ value }) => onUpdate({ type: value })}
          />
          <LabeledInput
            isVertical
            type="number"
            className={styles.hitPoints}
            disabled={!(FACTION_ASSETS[type] || {}).hp}
            label={
              <span>
                <FormattedMessage id="misc.hp" />
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
            isVertical
            className={styles.iconInput}
            type="checkbox"
            label={
              <EyeOff
                data-rh={intl.formatMessage({ id: 'misc.stealthed' })}
                className={styles.iconLabel}
                size={16}
              />
            }
            checked={stealthed}
            onChange={({ target } = {}) =>
              onUpdate({ stealthed: target.checked })
            }
          />
        </ItemRow>
        <ItemRow align="flexEnd">
          <LabeledInput
            dropUp
            isVertical
            type="dropdown"
            label="misc.location"
            clearable={false}
            value={locationEntity || Entities.planet.key}
            options={filter(
              Entities,
              ({ key, extraneous }) =>
                !extraneous && key !== Entities.sector.key,
            ).map((attr) => ({
              value: attr.key,
              label: intl.formatMessage({ id: attr.name }),
            }))}
            onChange={(option) =>
              onUpdate({
                locationEntity: (option || {}).value,
                location: undefined,
              })
            }
          />
          <Input
            dropUp
            isVertical
            type="dropdown"
            value={location}
            className={styles.loneInput}
            options={map(
              currentEntities[locationEntity || Entities.planet.key],
              (entity, value) => ({
                label: entity.name,
                value,
              }),
            )}
            onChange={(option) => onUpdate({ location: (option || {}).value })}
          />
        </ItemRow>
      </FlexContainer>
      <ReactHint events position="left" />
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
  locationEntity: PropTypes.string,
  stealthed: PropTypes.bool.isRequired,
  currentEntities: PropTypes.shape().isRequired,
  attributes: PropTypes.shape({
    force: PropTypes.number.isRequired,
    cunning: PropTypes.number.isRequired,
    wealth: PropTypes.number.isRequired,
  }).isRequired,
};

FactionAssetForm.defaultProps = {
  type: undefined,
  location: undefined,
  locationEntity: undefined,
};
