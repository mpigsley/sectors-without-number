import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ChevronRight, ChevronDown } from 'constants/icons';
import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default function SectionHeader({
  className,
  isOpen,
  onIconClick,
  children,
  ...rest
}) {
  let chevron;
  if (isOpen === undefined) {
    chevron = null;
  } else if (isOpen) {
    chevron = <ChevronDown onClick={onIconClick} size={20} />;
  } else {
    chevron = <ChevronRight onClick={onIconClick} size={20} />;
  }
  return (
    <FlexContainer align="center" className="SectionHeader" {...rest}>
      {chevron}
      <h3 className={classNames('SectionHeader-Inner', className)}>
        {children}
      </h3>
    </FlexContainer>
  );
}

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onIconClick: PropTypes.func,
};

SectionHeader.defaultProps = {
  className: undefined,
  isOpen: undefined,
  onIconClick: () => {},
};
