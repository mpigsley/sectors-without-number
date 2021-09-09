import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LabeledItem from 'primitives/other/labeled-item';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';

import './style.scss';

export default function LabeledInput({
  label,
  labelWidth,
  type,
  icon,
  checkboxes,
  isVertical,
  isRequired,
  className,
  ...rest
}) {
  const InputComponent = icon && type !== 'dropdown' ? IconInput : Input;
  return (
    <LabeledItem
      className={className}
      label={label}
      labelWidth={labelWidth}
      isVertical={isVertical || type === 'textarea' || type === 'color'}
      isRequired={isRequired}
    >
      <InputComponent type={type} icon={icon} {...rest} />
      {React.Children.map(checkboxes, (checkbox) =>
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
  label: PropTypes.node.isRequired,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  icon: PropTypes.func,
  checkboxes: PropTypes.arrayOf(PropTypes.node),
  isVertical: PropTypes.bool,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
};

LabeledInput.defaultProps = {
  labelWidth: undefined,
  type: 'text',
  icon: undefined,
  checkboxes: [],
  isVertical: false,
  isRequired: false,
  className: undefined,
};
