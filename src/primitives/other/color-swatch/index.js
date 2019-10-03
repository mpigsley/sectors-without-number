import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

export default function ColorSwatch({
  className,
  color,
  size,
  hoverable,
  ...rest
}) {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: size / 9,
        width: size,
        height: size,
      }}
      className={classNames(styles.swatch, className, {
        [styles['swatch--hoverable']]: hoverable,
      })}
      {...rest}
    />
  );
}

ColorSwatch.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
  hoverable: PropTypes.bool,
};

ColorSwatch.defaultProps = {
  className: undefined,
  size: 36,
  hoverable: false,
};
