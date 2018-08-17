import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dropdown from 'primitives/form/dropdown';

import './style.css';

export default function Input(props) {
  const { className, width, error, type, ...rest } = props;
  let style = {};
  if (props.width) {
    style = { width };
  }
  if (type === 'textarea') {
    return (
      <textarea
        {...rest}
        style={style}
        className={classNames('Input-Textarea', className, {
          'Input--error': error,
        })}
      />
    );
  } else if (type === 'dropdown') {
    return (
      <Dropdown wrapperClassName="Input-Dropdown" style={style} {...rest} />
    );
  }
  return (
    <input
      {...rest}
      type={type}
      className={classNames('Input', className, {
        'Input--error': error,
      })}
      style={style}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.bool,
};

Input.defaultProps = {
  className: null,
  type: 'text',
  width: null,
  error: false,
};
