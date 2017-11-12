import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function Button(props) {
  const { className, minimal, primary, skinny, ...rest } = props;
  return (
    <button
      {...rest}
      className={classNames(className, {
        Button: !minimal,
        'Button-Minimal': minimal,
        'Button-Primary': primary,
        'Button-Skinny': skinny,
      })}
    />
  );
}

Button.propTypes = {
  className: PropTypes.string,
  minimal: PropTypes.bool,
  primary: PropTypes.bool,
  skinny: PropTypes.bool,
};

Button.defaultProps = {
  className: null,
  minimal: false,
  primary: false,
  skinny: false,
};
