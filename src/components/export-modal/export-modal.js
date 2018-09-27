import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import ExportTypes from 'constants/export-types';
import { createJSONDownload, createImageDownlaod } from 'utils/export';
import { mapValues, omit } from 'constants/lodash';

import './style.css';

export default function ExportModal({
  isExportOpen,
  exportType,
  closeExport,
  startPrint,
  setEntityExport,
  intl,
  entities,
  sector,
}) {
  const onContinue = () => {
    if (exportType === ExportTypes.json.key) {
      closeExport();
      return createJSONDownload(
        mapValues(entities, entityTypes =>
          mapValues(entityTypes, entity => omit(entity, 'sector')),
        ),
        sector.name,
      );
    }
    if (exportType === ExportTypes.image.key) {
      closeExport();
      return createImageDownlaod('hex-map');
    }
    return startPrint();
  };

  return (
    <Modal
      width={500}
      isOpen={isExportOpen}
      onCancel={closeExport}
      title={intl.formatMessage({ id: 'misc.exportOptions' })}
      actionButtons={[
        <Button primary key="continue" onClick={onContinue}>
          <FormattedMessage id="misc.continue" />
        </Button>,
      ]}
    >
      <FlexContainer justify="center">
        <Button
          primary={exportType === ExportTypes.condensed.key}
          onClick={() => setEntityExport(ExportTypes.condensed.key)}
        >
          <FormattedMessage id="misc.condensed" />
        </Button>
        <Button
          primary={exportType === ExportTypes.expanded.key}
          onClick={() => setEntityExport(ExportTypes.expanded.key)}
        >
          <FormattedMessage id="misc.expanded" />
        </Button>
      </FlexContainer>
      <FlexContainer justify="center" className="ExportModal-Buttons">
        <Button
          primary={exportType === ExportTypes.image.key}
          onClick={() => setEntityExport(ExportTypes.image.key)}
        >
          <FormattedMessage id="misc.image" />
        </Button>
        <Button
          primary={exportType === ExportTypes.json.key}
          onClick={() => setEntityExport(ExportTypes.json.key)}
        >
          <FormattedMessage id="misc.jsonFormat" />
        </Button>
      </FlexContainer>
      <FlexContainer className="ExportModal-Description" justify="center">
        <FormattedMessage id={ExportTypes[exportType].description} />
      </FlexContainer>
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
  sector: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  entities: PropTypes.shape().isRequired,
};
