import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';

import './style.css';

export default function Dropdown(props) {
  const { dropUp, ...rest } = props;
  const newProps = Object.assign(
    {
      promptTextCreator: label => label,
    },
    rest,
  );
  return (
    <div className="Dropdown">
      <Select
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
};

Dropdown.defaultProps = {
  options: [],
  dropUp: false,
};
