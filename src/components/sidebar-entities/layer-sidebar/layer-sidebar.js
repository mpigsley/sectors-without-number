import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Button from 'primitives/other/button';
import Checkbox from 'primitives/form/checkbox';
import Label from 'primitives/form/label';
import Input from 'primitives/form/input';

import './style.css';

export default function LayerSidebar({ intl, entity, layerForm, updateLayer }) {
  const isSaved = !!entity;
  if (isSaved) {
    return <div />;
  }
  return (
    <FlexContainer className="LayerSidebar" direction="column">
      <Label noPadding>Layer Name</Label>
      <Input
        placeholder="Name (25 characters)"
        value={layerForm.name}
        onChange={({ target }) => updateLayer('name', target.value)}
      />
      <Label>Layer Description</Label>
      <Input
        type="textarea"
        rows="7"
        placeholder="Description"
        value={layerForm.description}
        onChange={({ target }) => updateLayer('description', target.value)}
      />
      <Checkbox
        label={intl.formatMessage({ id: 'misc.isHidden' })}
        value={layerForm.isHidden}
        onChange={({ target }) => updateLayer('isHidden', target.checked)}
      />
      <FlexContainer>
        <Button className="LayerSidebar-Create">Create Layer</Button>
      </FlexContainer>
    </FlexContainer>
  );
}

LayerSidebar.propTypes = {
  intl: intlShape.isRequired,
  entity: PropTypes.string,
  layerForm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
  }).isRequired,
  updateLayer: PropTypes.func.isRequired,
};

LayerSidebar.defaultProps = {
  entity: null,
};
