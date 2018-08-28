import React from 'react';
import Chance from 'chance';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import SidebarContainer from 'primitives/container/sidebar-container';
import SectionHeader from 'primitives/text/section-header';
import LabeledInput from 'primitives/form/labeled-input';
import SaveFooter from 'primitives/other/save-footer';
import ItemRow from 'primitives/other/item-row';

import { RefreshCw } from 'constants/icons';
import { omit, sortBy, map, dropRight } from 'constants/lodash';
import { FACTION_GOALS } from 'constants/faction';

import FactionAssetForm from './faction-asset-form';
import './style.css';

const chance = new Chance();

export default function FactionForm({
  intl,
  isCreating,
  form,
  updateFaction,
  updateFactionAsset,
  createBlankAsset,
  toRoute,
  location,
  homeworlds,
}) {
  const relationshipOptions = [
    {
      value: 'neutral',
      label: intl.formatMessage({ id: 'faction.relationship.neutral' }),
    },
    {
      value: 'friendly',
      label: intl.formatMessage({ id: 'faction.relationship.friendly' }),
    },
    {
      value: 'hostile',
      label: intl.formatMessage({ id: 'faction.relationship.hostile' }),
    },
  ];

  const homeworldOptions = sortBy(
    map(homeworlds, ({ name }, value) => ({
      value,
      label: name,
    })),
    'label',
  );

  const goalOptions = sortBy(
    map(FACTION_GOALS, value => ({
      value,
      label: intl.formatMessage({ id: `faction.goal.${value}` }),
    })),
    'label',
  );

  return (
    <SidebarContainer
      title={isCreating ? 'New Faction' : form.name}
      footer={
        <SaveFooter
          onCancel={() =>
            toRoute(dropRight(location.pathname.split('/')).join('/'))
          }
          disabled={!form.name}
          onSave={() => {}}
        />
      }
    >
      <div>
        <SectionHeader header="misc.attributes" />
        <div className="FactionForm">
          <LabeledInput
            isRequired
            label="misc.name"
            value={form.name}
            onChange={({ target }) => updateFaction({ name: target.value })}
          />
          <ItemRow>
            <LabeledInput
              label="faction.category.force"
              value={form.force}
              type="number"
              isVertical
              onChange={({ target }) => updateFaction({ force: target.value })}
            />
            <LabeledInput
              label="faction.category.cunning"
              value={form.cunning}
              type="number"
              isVertical
              onChange={({ target }) =>
                updateFaction({ cunning: target.value })
              }
            />
            <LabeledInput
              label="faction.category.wealth"
              value={form.wealth}
              type="number"
              isVertical
              onChange={({ target }) => updateFaction({ wealth: target.value })}
            />
          </ItemRow>
          <ItemRow>
            <LabeledInput
              label="misc.hitPoints"
              value={form.hitPoints}
              type="number"
              isVertical
              onChange={({ target }) =>
                updateFaction({ hitPoints: target.value })
              }
            />
            <LabeledInput
              label="misc.balance"
              value={form.balance}
              type="number"
              isVertical
              onChange={({ target }) =>
                updateFaction({ balance: target.value })
              }
            />
            <LabeledInput
              label="misc.experience"
              value={form.experience}
              type="number"
              isVertical
              onChange={({ target }) =>
                updateFaction({ experience: target.value })
              }
            />
          </ItemRow>
          <LabeledInput
            label="misc.relationship"
            placeholder=""
            type="dropdown"
            value={form.relationship}
            options={relationshipOptions}
            onChange={item =>
              updateFaction({ relationship: (item || {}).value })
            }
            icon={RefreshCw}
            onItemClick={() =>
              updateFaction({
                relationship: chance.pickone(relationshipOptions).value,
              })
            }
          />
          <LabeledInput
            label="misc.homeworld"
            placeholder=""
            type="dropdown"
            value={form.homeworld}
            options={homeworldOptions}
            onChange={item => updateFaction({ homeworld: (item || {}).value })}
            icon={RefreshCw}
            onItemClick={() =>
              updateFaction({
                homeworld: chance.pickone(homeworldOptions).value,
              })
            }
          />
          <LabeledInput
            label="misc.goal"
            placeholder=""
            type="dropdown"
            value={form.goal}
            options={goalOptions}
            onChange={item => updateFaction({ goal: (item || {}).value })}
            icon={RefreshCw}
            onItemClick={() =>
              updateFaction({
                goal: chance.pickone(goalOptions).value,
              })
            }
          />
          <LabeledInput
            label="misc.tags"
            multi
            placeholder=""
            type="dropdown"
            value={form.tags}
            options={goalOptions}
            onChange={items =>
              updateFaction({ tags: items.map(item => (item || {}).value) })
            }
          />
          <LabeledInput
            label="misc.description"
            rows="5"
            type="textarea"
            placeholder={intl.formatMessage({ id: 'misc.description' })}
            value={form.description}
            onChange={({ target } = {}) =>
              updateFaction({ description: target.value })
            }
          />
        </div>
        <SectionHeader
          header="misc.assets"
          addItemName="misc.asset"
          onAdd={createBlankAsset}
        />
        {map(form.assets, (asset, key) => (
          <FactionAssetForm
            key={key}
            intl={intl}
            homeworlds={homeworldOptions}
            onDelete={() => updateFaction({ assets: omit(form.assets, key) })}
            onUpdate={update => updateFactionAsset(key, update)}
            {...asset}
          />
        ))}
      </div>
    </SidebarContainer>
  );
}

FactionForm.propTypes = {
  intl: intlShape.isRequired,
  isCreating: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  updateFaction: PropTypes.func.isRequired,
  updateFactionAsset: PropTypes.func.isRequired,
  createBlankAsset: PropTypes.func.isRequired,
  toRoute: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  homeworlds: PropTypes.shape().isRequired,
};
