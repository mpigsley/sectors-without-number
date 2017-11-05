import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function Spinner({ className, isDark, size }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={classNames('Spinner', className, {
        'Spinner--dark': isDark,
      })}
    >
      <div className="Spinner-Circle1 Spinner-Child" />
      <div className="Spinner-Circle2 Spinner-Child" />
      <div className="Spinner-Circle3 Spinner-Child" />
      <div className="Spinner-Circle4 Spinner-Child" />
      <div className="Spinner-Circle5 Spinner-Child" />
      <div className="Spinner-Circle6 Spinner-Child" />
      <div className="Spinner-Circle7 Spinner-Child" />
      <div className="Spinner-Circle8 Spinner-Child" />
      <div className="Spinner-Circle9 Spinner-Child" />
      <div className="Spinner-Circle10 Spinner-Child" />
      <div className="Spinner-Circle11 Spinner-Child" />
      <div className="Spinner-Circle12 Spinner-Child" />
    </div>
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
  isDark: PropTypes.bool,
  size: PropTypes.number,
};

Spinner.defaultProps = {
  className: null,
  isDark: false,
  size: 30,
};
