import React from 'react';
import tinycolor from 'tinycolor2';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import './style.scss';

const DEFAULT_COLORS = [
  '#dbdbdb',
  '#8f8f8f',
  '#637182',
  '#000000',
  '#fc3c3c',
  '#21aba5',
];

export default function ColorPicker({ onChange, value }) {
  const handleChange = ({ target }) => {
    const color = tinycolor(target.value);
    if (color.isValid()) {
      return onChange(color.toHexString());
    }
    return onChange(target.value);
  };

  const border = `1px solid ${tinycolor(value)
    .darken(10)
    .toHexString()}`;

  return (
    <FlexContainer align="center">
      <FlexContainer
        style={{ backgroundColor: value, border }}
        align="center"
        flex="1"
        className="ColorPicker-InputContainer"
      >
        <input
          className="ColorPicker-Input"
          value={value}
          onChange={({ target }) => onChange(target.value)}
          onBlur={handleChange}
          onKeyPress={({ key, target }) => {
            if (key === 'Enter') {
              target.blur();
            }
          }}
        />
      </FlexContainer>
      {DEFAULT_COLORS.map(color => (
        <div
          style={{ backgroundColor: color }}
          className="ColorPicker-Preset"
          onClick={() => handleChange({ target: { value: color } })}
          key={color}
        />
      ))}
    </FlexContainer>
  );
}

ColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  value: '#dbdbdb',
};
