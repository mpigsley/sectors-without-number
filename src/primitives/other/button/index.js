import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function Button(props) {
  const { className, ...rest } = props;
  return <button {...rest} className={classNames('Button', className)} />;
}

Button.propTypes = {
  className: PropTypes.string,
};

Button.defaultProps = {
  className: null,
};
