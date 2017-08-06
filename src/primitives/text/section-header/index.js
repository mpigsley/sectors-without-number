import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function SectionHeader(props) {
  const { className, ...rest } = props;
  return (
    <h3
      {...rest}
      className={classNames('SectionHeader', className)}
    >
      {props.children}
    </h3>
  );
}

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SectionHeader.defaultProps = {
  className: null,
};
