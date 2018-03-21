import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';

function ConfirmModal({ isOpen, onConfirm, onCancel, children, intl }) {
  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      cancelText={intl.formatMessage({ id: 'misc.no' })}
      title="Confirm"
      actionButtons={[
        <Button primary key="save" onClick={onConfirm}>
          <FormattedMessage id="misc.yes" />
        </Button>,
      ]}
    >
      {children || <FormattedMessage id="misc.toContinue" />}
    </Modal>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.node,
  intl: intlShape.isRequired,
};

ConfirmModal.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
  children: undefined,
};

export default injectIntl(ConfirmModal);
