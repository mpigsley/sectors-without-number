import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Modal from 'primitives/modal/modal';

export default function CustomTagModal({
  intl,
  isCustomTagModalOpen,
  closeCustomTagModal,
}) {
  return (
    <Modal
      hideFooter
      width={500}
      isOpen={isCustomTagModalOpen}
      onCancel={closeCustomTagModal}
      title={intl.formatMessage({ id: 'misc.configureTags' })}
    >
      <FlexContainer>
        <span />
      </FlexContainer>
    </Modal>
  );
}

CustomTagModal.propTypes = {
  intl: intlShape.isRequired,
  isCustomTagModalOpen: PropTypes.bool.isRequired,
  closeCustomTagModal: PropTypes.func.isRequired,
};
