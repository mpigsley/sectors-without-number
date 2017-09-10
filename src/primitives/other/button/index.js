import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function Button(props) {
  const { className, minimal, ...rest } = props;
  return (
    <button
      {...rest}
      className={classNames(className, {
        Button: !minimal,
        'Button-Minimal': minimal,
      })}
    />
  );
}

Button.propTypes = {
  className: PropTypes.string,
  minimal: PropTypes.bool,
};

Button.defaultProps = {
  className: null,
  minimal: false,
};
