import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Button from 'primitives/other/button';
import Checkbox from 'primitives/form/checkbox';
import Label from 'primitives/form/label';
import Input from 'primitives/form/input';

import { LAYER_NAME_LENGTH } from 'constants/defaults';
import './style.css';

export default function NewLayer({
  intl,
  layerForm,
  updateLayer,
  addLayer,
  isValid,
}) {
  return (
    <FlexContainer className="NewLayer" direction="column">
      <Label noPadding>Layer Name *</Label>
      <Input
        error={layerForm.name.length > LAYER_NAME_LENGTH}
        placeholder={`Name (${LAYER_NAME_LENGTH} characters)`}
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
        <Button
          disabled={!isValid}
          className="NewLayer-Create"
          onClick={() => addLayer()}
        >
          Create Layer
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
}

NewLayer.propTypes = {
  intl: intlShape.isRequired,
  layerForm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
  }).isRequired,
  updateLayer: PropTypes.func.isRequired,
  addLayer: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
};
