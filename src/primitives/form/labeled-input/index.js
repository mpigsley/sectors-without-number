import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LabeledItem from 'primitives/other/labeled-item';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';

import './style.css';

export default function LabeledInput({
  label,
  type,
  icon,
  checkboxes,
  ...rest
}) {
  const InputComponent = icon && type !== 'dropdown' ? IconInput : Input;
  return (
    <LabeledItem label={label} isVertical={type === 'textarea'}>
      <InputComponent type={type} icon={icon} {...rest} />
      {React.Children.map(checkboxes, checkbox =>
        React.cloneElement(checkbox, {
          className: classNames(
            checkbox.props.className,
            'LabeledInput-Checkbox',
          ),
        }),
      )}
    </LabeledItem>
  );
}

LabeledInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.func,
  checkboxes: PropTypes.arrayOf(PropTypes.node),
};

LabeledInput.defaultProps = {
  type: 'text',
  icon: undefined,
  checkboxes: [],
};
