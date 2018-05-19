import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export const HeaderType = {
  header1: 'header1',
  header2: 'header2',
  header3: 'header3',
  header4: 'header4',
};

export default function Header({
  type,
  className,
  dark,
  noMargin,
  children,
  ...rest
}) {
  const headerNum = type.split('header').pop();
  const Component = `h${headerNum}`;
  return (
    <Component
      {...rest}
      className={classNames('Header', `Header-${headerNum}`, className, {
        'Header--dark': dark,
        'Header--noMargin': noMargin,
      })}
    >
      {children}
    </Component>
  );
}

Header.propTypes = {
  type: PropTypes.oneOf(Object.keys(HeaderType)),
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
  className: PropTypes.string,
  noMargin: PropTypes.bool,
};

Header.defaultProps = {
  type: HeaderType.header1,
  dark: false,
  className: null,
  noMargin: false,
};
