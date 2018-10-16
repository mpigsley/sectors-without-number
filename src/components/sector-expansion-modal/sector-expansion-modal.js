import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';

export default function SectorExpansionModal({
  intl,
  isOpen,
  closeSectorExpansion,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onCancel={closeSectorExpansion}
      title={intl.formatMessage({ id: 'misc.expandSector' })}
      actionButtons={[
        <Button primary key="continue" onClick={() => {}}>
          <FormattedMessage id="misc.expand" />
        </Button>,
      ]}
    >
      <div />
    </Modal>
  );
}

SectorExpansionModal.propTypes = {
  intl: intlShape.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeSectorExpansion: PropTypes.func.isRequired,
};
