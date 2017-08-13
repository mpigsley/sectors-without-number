import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router';
import isExternal from 'is-url-external';
import classNames from 'classnames';

export default function ButtonLink(props) {
  const { className, to, ...rest } = props;
  const linkClass = classNames('Button', className); // Uses Button CSS
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
};

ButtonLink.defaultProps = {
  className: null,
};
