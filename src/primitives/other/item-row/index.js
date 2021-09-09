import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';

import './style.scss';

export default function ItemRow({ children, className, ...rest }) {
  return (
    <FlexContainer
      className={classNames('ItemRow', className)}
      justify="spaceBetween"
      {...rest}
    >
      {React.Children.map(
        children,
        (item) =>
          item &&
          React.cloneElement(item, {
            className: classNames(item.props.className, 'ItemRow-Item'),
          }),
      )}
    </FlexContainer>
  );
}

ItemRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
};

ItemRow.defaultProps = {
  className: undefined,
};
