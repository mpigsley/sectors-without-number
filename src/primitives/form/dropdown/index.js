import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';

import './style.css';

export default function Dropdown(props) {
  const newProps = Object.assign(
    {
      promptTextCreator: label => label,
    },
    props,
  );
  return (
    <div className="Dropdown">
      <Select
        {...newProps}
        className={classNames('Dropdown-Select', newProps.className)}
        optionClassName="Dropdown-Option"
      />
    </div>
  );
}

const SelectPropTypes = Object.assign({}, Select.propTypes);
// SelectPropTypes.someProp = PropTypes.string;

Dropdown.propTypes = SelectPropTypes;

Dropdown.defaultProps = {
  options: [],
};
