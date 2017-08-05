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

export default function Header(props) {
  const { type, className, ...rest } = props;
  const headerNum = type.split('header').pop();
  const Component = `h${headerNum}`;
  return (
    <Component
      {...rest}
      className={classNames('Header', `Header-${headerNum}`, className)}
    >
      {props.children}
    </Component>
  );
}

Header.propTypes = {
  type: PropTypes.oneOf(Object.keys(HeaderType)),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Header.defaultProps = {
  type: HeaderType.header1,
  className: null,
};
