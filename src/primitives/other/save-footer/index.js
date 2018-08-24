import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default function SaveFooter({ onCancel, onSave }) {
  return (
    <FlexContainer>
      <button
        className="SaveFooter-Button SaveFooter-Cancel"
        onClick={onCancel}
      >
        <FormattedMessage id="misc.cancel" />
      </button>
      <button className="SaveFooter-Button SaveFooter-Save" onClick={onSave}>
        <FormattedMessage id="misc.save" />
      </button>
    </FlexContainer>
  );
}

SaveFooter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
