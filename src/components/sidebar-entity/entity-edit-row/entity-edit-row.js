import React from 'react';
import PropTypes from 'prop-types';
import { X, RefreshCw, RotateCcw } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';
import Input from 'primitives/form/input';
import IconInput from 'primitives/form/icon-input';
import Entities from 'constants/entities';

import './style.css';

export default function EntityEditRow({
  entity,
  entityType,
  deleteEntityInEdit,
  undoDeleteEntityInEdit,
  updateEntityInEdit,
}) {
  let input = (
    <Input
      name="name"
      value={entity.name}
      onChange={e => updateEntityInEdit({ name: e.target.value })}
    />
  );
  if (Entities[entityType].nameGenerator) {
    input = (
      <IconInput
        name="name"
        icon={RefreshCw}
        value={entity.name}
        onChange={e => updateEntityInEdit({ name: e.target.value })}
        onIconClick={() =>
          updateEntityInEdit({ name: Entities[entityType].nameGenerator() })
        }
      />
    );
  }

  let iconAction = (
    <X
      className="EntityEditRow-Action"
      size={25}
      onClick={deleteEntityInEdit}
    />
  );
  if (entity.isDeleted) {
    iconAction = (
      <RotateCcw
        className="EntityEditRow-Action"
        size={25}
        onClick={undoDeleteEntityInEdit}
      />
    );
  }

  return (
    <FlexContainer align="center" className="EntityEditRow">
      {iconAction}
      {input}
      <Input
        className="EntityEditRow-Generate"
        disabled={!entity.isCreated}
        checked={!entity.isCreated || entity.generate}
        name="checkbox"
        type="checkbox"
      />
    </FlexContainer>
  );
}

EntityEditRow.propTypes = {
  entityType: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    name: PropTypes.string,
    entityId: PropTypes.string,
    isDeleted: PropTypes.bool,
    isCreated: PropTypes.bool,
    generate: PropTypes.bool,
  }).isRequired,
  deleteEntityInEdit: PropTypes.func.isRequired,
  undoDeleteEntityInEdit: PropTypes.func.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
};
