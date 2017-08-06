import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function LinkIcon(props) {
  const Icon = props.icon;
  return (
    <Icon {...props} className={classNames('LinkIcon', props.className)} />
  );
}

LinkIcon.propTypes = {
  icon: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LinkIcon.defaultProps = {
  className: null,
};
