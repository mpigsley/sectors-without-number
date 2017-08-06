import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function Input(props) {
  const { className, width, ...rest } = props;
  let style = {};
  if (props.width) {
    style = { width };
  }
  return (
    <input
      {...rest}
      className={classNames('Input', className)}
      style={style}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Input.defaultProps = {
  className: null,
  width: null,
};
