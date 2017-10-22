import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function LinkIcon({ icon, className, ...rest }) {
  const Icon = icon;
  return <Icon {...rest} className={classNames('LinkIcon', className)} />;
}

LinkIcon.propTypes = {
  icon: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LinkIcon.defaultProps = {
  className: null,
};
