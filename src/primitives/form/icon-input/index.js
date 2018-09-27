import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from 'primitives/form/input';

import './style.scss';

const defaultFunc = () => {};

export default function IconInput({
  icon,
  onIconClick,
  wrapperClassName,
  className,
  ...rest
}) {
  const Icon = icon;
  return (
    <div className={classNames('IconInput', wrapperClassName)}>
      <Icon
        className={classNames('IconInput-Icon', {
          'IconInput-Icon--clickable': onIconClick,
        })}
        onClick={onIconClick || defaultFunc}
        size={15}
      />
      <Input {...rest} className={classNames('IconInput-Input', className)} />
    </div>
  );
}

IconInput.propTypes = {
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  icon: PropTypes.func.isRequired,
  onIconClick: PropTypes.func,
};

IconInput.defaultProps = {
  className: null,
  wrapperClassName: null,
  onIconClick: null,
};
