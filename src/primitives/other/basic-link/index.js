import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ButtonLink from 'primitives/other/button-link';

import './style.scss';

export default function BasicLink({ className, ...rest }) {
  return (
    <ButtonLink
      {...rest}
      minimal
      className={classNames('BasicLink', className)}
    />
  );
}

BasicLink.propTypes = {
  className: PropTypes.string,
};

BasicLink.defaultProps = {
  className: null,
};
