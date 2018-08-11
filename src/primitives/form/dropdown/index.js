import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select, { Creatable } from 'react-select';

import { RefreshCw } from 'constants/icons';

import './style.css';

export default function Dropdown(props) {
  const { onGenerate, dropUp, allowCreate, wrapperClassName, ...rest } = props;
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
      <div className="Generate">
        <RefreshCw
          onClick={onGenerate}
          size={15}
        />
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  ...Select.propTypes,
  dropUp: PropTypes.bool,
  allowCreate: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  onGenerate: PropTypes.func,
};

Dropdown.defaultProps = {
  dropUp: false,
  allowCreate: false,
  wrapperClassName: null,
  onGenerate: () => {}
};
