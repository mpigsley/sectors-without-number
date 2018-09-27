import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import { RotateCcw, X } from 'constants/icons';

import './style.scss';

export default function DeletableRow({
  onAction,
  undoDelete,
  children,
  ...props
}) {
  const Icon = undoDelete ? RotateCcw : X;
  return (
    <FlexContainer {...props}>
      <Icon className="DeletableRow-Icon" size={25} onClick={onAction} />
      {children}
    </FlexContainer>
  );
}

DeletableRow.propTypes = {
  onAction: PropTypes.func.isRequired,
  undoDelete: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

DeletableRow.defaultProps = {
  undoDelete: false,
};
