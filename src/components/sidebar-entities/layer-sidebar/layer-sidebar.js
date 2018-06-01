import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import Input from 'primitives/form/input';

import './style.css';

export default function LayerSidebar({ entity }) {
  const isSaved = !!entity;
  if (isSaved) {
    return <div />;
  }
  return (
    <FlexContainer className="LayerSidebar" direction="column">
      <Label noPadding>New Layer Name</Label>
      <Input placeholder="Layer Name (25 characters)" />
      <FlexContainer>
        <Button className="LayerSidebar-Create">Create Layer</Button>
      </FlexContainer>
    </FlexContainer>
  );
}

LayerSidebar.propTypes = {
  entity: PropTypes.string,
};

LayerSidebar.defaultProps = {
  entity: null,
};
