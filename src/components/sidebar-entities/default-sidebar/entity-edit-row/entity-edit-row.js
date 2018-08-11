import React from 'react';
import PropTypes from 'prop-types';
import ReactHintFactory from 'react-hint';
import { intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Input from 'primitives/form/input';
import IconInput from 'primitives/form/icon-input';
import Dropdown from 'primitives/form/dropdown';

import { X, RefreshCw, RotateCcw } from 'constants/icons';
import Entities from 'constants/entities';
import { coordinateKey, coordinatesFromKey } from 'utils/common';

import './style.css';

const ReactHint = ReactHintFactory(React);

export default function EntityEditRow({
  entity,
  entityType,
  emptyHexKeys,
  deleteChildInEdit,
  undoDeleteChildInEdit,
  updateChildInEdit,
  isCurrentOrAncestorHidden,
  intl,
}) {
  const entityConfig = Entities[entityType];

  let input = (
    <Input
      name="name"
      value={entity.name}
      onChange={e => updateChildInEdit({ name: e.target.value })}
    />
  );
  if (entityConfig.nameGenerator) {
    input = (
      <IconInput
        name="name"
        icon={RefreshCw}
        value={entity.name}
        onChange={e => updateChildInEdit({ name: e.target.value })}
        onIconClick={() =>
          updateChildInEdit({ name: entityConfig.nameGenerator() })
        }
      />
    );
  }

  let dropdown = null;
  if (entityConfig.topLevel) {
    dropdown = (
      <Dropdown
        className="EntityEditRow-Dropdown"
        value={coordinateKey(entity.x, entity.y)}
        clearable={false}
        onChange={({ value }) => updateChildInEdit(coordinatesFromKey(value))}
        options={[...emptyHexKeys, coordinateKey(entity.x, entity.y)]
          .sort()
          .map(key => ({
            value: key,
            label: key,
          }))}
      />
    );
  }

  let iconAction = (
    <X className="EntityEditRow-Action" size={25} onClick={deleteChildInEdit} />
  );
  if (entity.isDeleted) {
    iconAction = (
      <RotateCcw
        className="EntityEditRow-Action"
        size={25}
        onClick={undoDeleteChildInEdit}
      />
    );
  }

  return (
    <FlexContainer align="center" className="EntityEditRow">
      {iconAction}
      {dropdown}
      {input}
      <Input
        className="EntityEditRow-Checkbox"
        disabled={!entity.isCreated}
        checked={!entity.isCreated || entity.generate}
        onChange={({ target }) =>
          updateChildInEdit({ generate: target.checked })
        }
        type="checkbox"
      />
      <span
        data-rh={
          isCurrentOrAncestorHidden
            ? intl.formatMessage(
              { id: 'misc.hiddenParrent' },
              { entity: intl.formatMessage({ id: entityConfig.shortName }) },
            )
            : null
        }
      >
        <Input
          className="EntityEditRow-Checkbox"
          disabled={isCurrentOrAncestorHidden}
          checked={entity.isHidden || isCurrentOrAncestorHidden || false}
          onChange={({ target }) =>
            updateChildInEdit({ isHidden: target.checked })
          }
          type="checkbox"
        />
      </span>
      <ReactHint events position="left" />
    </FlexContainer>
  );
}

EntityEditRow.propTypes = {
  entityType: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    name: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    entityId: PropTypes.string,
    isDeleted: PropTypes.bool,
    isCreated: PropTypes.bool,
    generate: PropTypes.bool,
    isHidden: PropTypes.bool,
  }).isRequired,
  emptyHexKeys: PropTypes.arrayOf(PropTypes.string),
  deleteChildInEdit: PropTypes.func.isRequired,
  undoDeleteChildInEdit: PropTypes.func.isRequired,
  updateChildInEdit: PropTypes.func.isRequired,
  isCurrentOrAncestorHidden: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

EntityEditRow.defaultProps = {
  emptyHexKeys: [],
};
