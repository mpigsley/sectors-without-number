import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router';
import isExternal from 'is-url-external';
import classNames from 'classnames';

import './style.css';

export default function Link(props) {
  const { padded, to, ...rest } = props;
  const className = classNames('Link', {
    'Link--padded': props.padded,
  });
  if (isExternal(to)) {
    return (
      <a // eslint-disable-line
        {...rest}
        href={to}
        className={className}
      />
    );
  }
  return <RouterLink {...rest} to={to} className={className} />;
}

Link.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
};

Link.defaultProps = {
  className: null,
  padded: false,
};
