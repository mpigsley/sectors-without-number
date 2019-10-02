import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

export default function ColorSwatch({ className, color, size, ...rest }) {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: size / 9,
        width: size,
        height: size,
      }}
      className={classNames(styles.swatch, className)}
      {...rest}
    />
  );
}

ColorSwatch.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
};

ColorSwatch.defaultProps = {
  className: undefined,
  size: 36,
};
