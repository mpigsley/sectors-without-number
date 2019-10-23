import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from '../flex-container';

import './style.scss';

export default function SubContainer({ children, className, ...rest }) {
  return (
    <FlexContainer {...rest} className={classNames('SubContainer', className)}>
      {children}
    </FlexContainer>
  );
}

SubContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SubContainer.defaultProps = {
  className: null,
};
