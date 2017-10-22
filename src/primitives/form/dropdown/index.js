import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select, { Creatable } from 'react-select';

import './style.css';

export default function Dropdown(props) {
  const { dropUp, allowCreate, ...rest } = props;
  const newProps = Object.assign(
    {
      promptTextCreator: label => label,
    },
    rest,
  );
  const DropdownComponent = allowCreate ? Creatable : Select;
  return (
    <div className="Dropdown">
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
};

Dropdown.defaultProps = {
  dropUp: false,
  allowCreate: false,
};
