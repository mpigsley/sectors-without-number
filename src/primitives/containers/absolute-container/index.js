import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function AbsoluteContainer({ children, className }) {
  return <div className={classNames('AbsoluteContainer', className)}>{children}</div>;
}

AbsoluteContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AbsoluteContainer.defaultProps = {
  className: null,
};
