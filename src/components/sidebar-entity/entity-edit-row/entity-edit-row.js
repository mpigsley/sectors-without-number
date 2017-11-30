import React from 'react';
import PropTypes from 'prop-types';
import { X, RefreshCw } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';
import Input from 'primitives/form/input';
import IconInput from 'primitives/form/icon-input';
import Entities from 'constants/entities';

import './style.css';

export default function EntityEditRow({ entity, entityType }) {
  let input = <Input value={entity.name} />;
  if (Entities[entityType].nameGenerator) {
    input = (
      <IconInput
        name="name"
        icon={RefreshCw}
        value={entity.name}
        onIconClick={() => {
          // Entities[entityType].nameGenerator
        }}
      />
    );
  }
  return (
    <FlexContainer align="center" className="EntityEditRow">
      <X className="EntityEditRow-Delete" size={25} />
      {input}
      <Input
        className="EntityEditRow-Generate"
        checked={false}
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
  }).isRequired,
};
