import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import Button from 'primitives/other/button';
import Input from 'primitives/form/input';

import './style.css';

export default function EntityEditRow({ entity }) {
  return (
    <FlexContainer align="center" className="EntityEditRow">
      <Input value={entity.name} className="EntityEditRow-Name" />
      <Button minimal className="EntityEditRow-Delete">
        Delete
      </Button>
    </FlexContainer>
  );
}

EntityEditRow.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
