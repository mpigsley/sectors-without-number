import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';
import Label from 'primitives/form/label';

import './style.css';

export default function LabeledInput({ isVertical, label, children }) {
  return (
    <FlexContainer
      align="center"
      className={classNames('LabeledInput', {
        'LabeledInput--vertical': isVertical,
      })}
    >
      <Label noPadding className="LabeledInput-Label">
        {label}:
      </Label>
      {children}
    </FlexContainer>
  );
}

LabeledInput.propTypes = {
  isVertical: PropTypes.bool,
  label: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

LabeledInput.defaultProps = {
  isVertical: false,
};
