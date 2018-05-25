import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import isExternal from 'is-url-external';
import classNames from 'classnames';

export default function ButtonLink(props) {
  const { className, minimal, to, ...rest } = props;
  const linkClass = classNames(className, {
    Button: !minimal, // Uses Button CSS
    'Button-Minimal': minimal,
  });
  if (isExternal(to)) {
    return (
      <a // eslint-disable-line
        {...rest}
        href={to}
        className={linkClass}
      />
    );
  }
  return <RouterLink {...rest} to={to} className={linkClass} />;
}

ButtonLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  minimal: PropTypes.bool,
};

ButtonLink.defaultProps = {
  className: null,
  minimal: false,
};
