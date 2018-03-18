import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import ExportTypes from 'constants/export-types';

import './style.css';

export default function ExportModal({
  isOpen,
  exportType,
  onCancel,
  setEntityExport,
}) {
  const onPrint = () => {
    onCancel();
    setTimeout(() => {
      window.print();
    }, 1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      title="Print Options"
      actionButtons={[
        <Button primary key="continue" onClick={onPrint}>
          <FormattedMessage id="misc.continue" />
        </Button>,
      ]}
    >
      <FlexContainer justify="spaceBetween">
        <Button
          className="ExportModal-Button"
          primary={exportType === ExportTypes.condensed.key}
          onClick={() => setEntityExport(ExportTypes.condensed.key)}
        >
          <FormattedMessage id="misc.condensed" />
        </Button>
        <Button
          className="ExportModal-Button"
          primary={exportType === ExportTypes.expanded.key}
          onClick={() => setEntityExport(ExportTypes.expanded.key)}
        >
          <FormattedMessage id="misc.expanded" />
        </Button>
      </FlexContainer>
      <FormattedMessage id={ExportTypes[exportType].description} />
    </Modal>
  );
}

ExportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  exportType: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  setEntityExport: PropTypes.func.isRequired,
};
