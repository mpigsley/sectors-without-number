import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function FlexContainer(props) {
  const {
    align,
    className,
    justify,
    direction,
    children,
    wrap,
    scroll,
    flex,
    shrink,
    ...rest
  } = props;
  return (
    <div
      {...rest}
      className={classNames('FlexContainer', className, {
        [`FlexContainer-Align--${props.align}`]: align,
        [`FlexContainer-Justify--${justify}`]: justify,
        [`FlexContainer-Direction--${direction}`]: direction,
        [`FlexContainer-Flex--${flex}`]: flex,
        [`FlexContainer-Shrink--${shrink}`]: shrink,
        'FlexContainer-Wrap': wrap,
        'FlexContainer-Scroll': scroll,
      })}
    >
      {children}
    </div>
  );
}

FlexContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  align: PropTypes.oneOf([
    'stretch',
    'center',
    'flexStart',
    'flexEnd',
    'baseline',
    'initial',
    'inherit',
  ]),
  justify: PropTypes.oneOf([
    'flexStart',
    'flexEnd',
    'center',
    'spaceBetween',
    'spaceAround',
    'initial',
    'inherit',
  ]),
  direction: PropTypes.oneOf(['row', 'column']),
  wrap: PropTypes.bool,
  scroll: PropTypes.bool,
  flex: PropTypes.oneOf(['0', '1']),
  shrink: PropTypes.oneOf(['0', '1']),
};

FlexContainer.defaultProps = {
  className: null,
  align: 'stretch',
  justify: null,
  direction: null,
  wrap: false,
  scroll: false,
  flex: null,
  shrink: null,
};
