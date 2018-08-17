import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Label from 'primitives/form/label';

import './style.css';

export default function LabeledItem({ isVertical, label, children }) {
  return (
    <FlexContainer
      align="center"
      className={classNames('LabeledItem', {
        'LabeledItem--vertical': isVertical,
      })}
    >
      <Label noPadding className="LabeledItem-Label">
        <FormattedMessage id={label} />:
      </Label>
      <FlexContainer className="LabeledItem-Item">{children}</FlexContainer>
    </FlexContainer>
  );
}

LabeledItem.propTypes = {
  isVertical: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

LabeledItem.defaultProps = {
  isVertical: false,
};
