import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';

import { MAX_DIMENSION } from 'constants/defaults';

export default function SectorExpansionModal({
  intl,
  isOpen,
  closeSectorExpansion,
}) {
  return (
    <Modal
      width="500px"
      isOpen={isOpen}
      onCancel={closeSectorExpansion}
      footerText={intl.formatMessage(
        { id: 'misc.maxSize' },
        { num: MAX_DIMENSION },
      )}
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
