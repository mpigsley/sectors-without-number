import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import Input from 'primitives/form/input';
import Label from 'primitives/form/label';

import './style.scss';

export default function Checkbox({ label, value, onChange, ...rest }) {
  return (
    <FlexContainer align="center" className="Checkbox">
      <Input
        onChange={onChange}
        checked={value}
        name="checkbox"
        type="checkbox"
        {...rest}
      />
      <Label noPadding htmlFor="checkbox">
        {label}
      </Label>
    </FlexContainer>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
