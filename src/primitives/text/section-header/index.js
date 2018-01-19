import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronRight, ChevronDown } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default function SectionHeader(props) {
  const { className, isOpen, ...rest } = props;
  return (
    <FlexContainer align="center" className="SectionHeader" {...rest}>
      {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      <h3 className={classNames('SectionHeader-Inner', className)}>
        {props.children}
      </h3>
    </FlexContainer>
  );
}

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
};

SectionHeader.defaultProps = {
  className: null,
  isOpen: true,
};
