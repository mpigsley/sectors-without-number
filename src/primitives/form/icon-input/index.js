import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from 'primitives/form/input';

import './style.css';

const defaultFunc = () => {};

export default function IconInput(props) {
  const { icon, onIconClick, ...rest } = props;
  const Icon = icon;
  return (
    <div className="IconInput">
      <Input
        {...rest}
        className={classNames('IconInput-Input', props.className)}
      />
      <Icon
        className={classNames('IconInput-Icon', {
          'IconInput-Icon--clickable': onIconClick,
        })}
        onClick={onIconClick || defaultFunc}
        size={20}
      />
    </div>
  );
}

IconInput.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.func.isRequired,
  onIconClick: PropTypes.func,
};

IconInput.defaultProps = {
  className: null,
  onIconClick: null,
};
