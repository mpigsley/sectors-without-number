import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Spinner from 'primitives/other/spinner';

import './style.scss';

export default function Button({
  children,
  className,
  minimal,
  primary,
  skinny,
  loading,
  ...rest
}) {
  let loadingSpinner = null;
  if (loading) {
    loadingSpinner = (
      <Spinner size={20} className="Button-Spinner" isDark={primary} />
    );
  }
  return (
    <button
      {...rest}
      type="button"
      className={classNames(className, {
        Button: !minimal,
        'Button-Minimal': minimal,
        'Button-Primary': primary,
        'Button-Skinny': skinny,
      })}
    >
      {loadingSpinner}
      <span
        className={classNames('Button-Inner', { 'Button-Loading': loading })}
      >
        {children}
      </span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  minimal: PropTypes.bool,
  primary: PropTypes.bool,
  skinny: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  className: null,
  minimal: false,
  primary: false,
  skinny: false,
  loading: false,
};
