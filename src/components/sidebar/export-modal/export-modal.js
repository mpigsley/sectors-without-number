import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import ExportTypes from 'constants/export-types';

import './style.css';

export default function ExportModal({
  isExportOpen,
  exportType,
  closeExport,
  startPrint,
  setEntityExport,
  intl,
}) {
  return (
    <Modal
      isOpen={isExportOpen}
      onCancel={closeExport}
      title={intl.formatMessage({ id: 'misc.printOptions' })}
      actionButtons={[
        <Button primary key="continue" onClick={startPrint}>
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
  isExportOpen: PropTypes.bool.isRequired,
  exportType: PropTypes.string.isRequired,
  closeExport: PropTypes.func.isRequired,
  startPrint: PropTypes.func.isRequired,
  setEntityExport: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};
