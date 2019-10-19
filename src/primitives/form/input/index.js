import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ColorPicker from 'primitives/form/color-picker';
import Dropdown from 'primitives/form/dropdown';

import './style.scss';

export default function Input({ className, width, error, type, ...rest }) {
  let style = {};
  if (width) {
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
  }
  if (type === 'dropdown') {
    return (
      <Dropdown
        wrapperClassName={classNames('Input-Dropdown', className)}
        style={style}
        {...rest}
      />
    );
  }
  if (type === 'color') {
    return <ColorPicker className={className} {...rest} />;
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
