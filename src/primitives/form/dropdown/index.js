import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select, { Creatable } from 'react-select';

import './style.css';

export default function Dropdown(props) {
  const { dropUp, allowCreate, wrapperClassName, ...rest } = props;
  const newProps = Object.assign(
    {
      promptTextCreator: label => label,
    },
    rest,
  );
  const DropdownComponent = allowCreate ? Creatable : Select;
  return (
    <div className={classNames('Dropdown', wrapperClassName)}>
      <DropdownComponent
        {...newProps}
        className={classNames('Dropdown-Select', newProps.className, {
          'Dropdoown-Up': dropUp,
        })}
        optionClassName="Dropdown-Option"
      />
    </div>
  );
}

Dropdown.propTypes = {
  ...Select.propTypes,
  dropUp: PropTypes.bool,
  allowCreate: PropTypes.bool,
  wrapperClassName: PropTypes.string,
};

Dropdown.defaultProps = {
  dropUp: false,
  allowCreate: false,
  wrapperClassName: null,
};
