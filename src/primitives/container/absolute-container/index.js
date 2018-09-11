import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

function AbsoluteContainer({ forwardedRef, children, className, ...props }) {
  return (
    <div
      ref={forwardedRef}
      className={classNames('AbsoluteContainer', className)}
      {...props}
    >
      {children}
    </div>
  );
}

AbsoluteContainer.propTypes = {
  forwardedRef: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AbsoluteContainer.defaultProps = {
  forwardedRef: null,
  className: null,
};

export default React.forwardRef((props, ref) => (
  <AbsoluteContainer {...props} forwardedRef={ref} />
));
