import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function Input(props) {
  const { className, width, error, ...rest } = props;
  let style = {};
  if (props.width) {
    style = { width };
  }
  return (
    <input
      {...rest}
      className={classNames('Input', className, {
        'Input--error': error,
      })}
      style={style}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.bool,
};

Input.defaultProps = {
  className: null,
  width: null,
  error: false,
};
