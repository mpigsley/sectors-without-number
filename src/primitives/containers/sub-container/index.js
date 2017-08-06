import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from '../flex-container';

import './style.css';

export default function SubContainer(props) {
  const { children, className, noMargin, fullWidth, ...rest } = props;
  return (
    <FlexContainer
      {...rest}
      className={classNames('SubContainer', className, {
        'SubContainer--margin': !noMargin,
        'SubContainer--fullWidth': fullWidth,
      })}
    >
      {children}
    </FlexContainer>
  );
}

SubContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noMargin: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

SubContainer.defaultProps = {
  className: null,
  noMargin: false,
  fullWidth: false,
};
