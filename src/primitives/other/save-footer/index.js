import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default function SaveFooter({
  onCancel,
  onSave,
  cancelText,
  saveText,
  disabled,
}) {
  return (
    <FlexContainer>
      <button
        className="SaveFooter-Button SaveFooter-Cancel"
        onClick={onCancel}
      >
        <FormattedMessage id={cancelText} />
      </button>
      <button
        disabled={disabled}
        className="SaveFooter-Button SaveFooter-Save"
        onClick={onSave}
      >
        <FormattedMessage id={saveText} />
      </button>
    </FlexContainer>
  );
}

SaveFooter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  saveText: PropTypes.string,
  disabled: PropTypes.bool,
};

SaveFooter.defaultProps = {
  cancelText: 'misc.cancel',
  saveText: 'misc.save',
  disabled: false,
};
