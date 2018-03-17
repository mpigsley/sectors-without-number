import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import Modal from 'primitives/modal/modal';

function SectorSyncModal({ intl, ...props }) {
  return (
    <Modal
      {...props}
      title={intl.formatMessage({ id: 'misc.sectorsSynced' })}
      cancelText={intl.formatMessage({ id: 'misc.continue' })}
    >
      <FormattedMessage id="misc.sectorsSynced" />
    </Modal>
  );
}

SectorSyncModal.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SectorSyncModal);
