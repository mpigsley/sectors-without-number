import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from '../flex-container';

import './style.scss';

export default function ContentContainer(props) {
  const { children, className, ...rest } = props;
  return (
    <FlexContainer
      {...rest}
      className={classNames('ContentContainer', className)}
    >
      {children}
    </FlexContainer>
  );
}

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ContentContainer.defaultProps = {
  className: null,
};
