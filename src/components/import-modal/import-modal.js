import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import { createJSONDownload } from 'utils/export';
import { validateImport } from 'utils/import-validator';
import dayjs from 'dayjs';

import './style.scss';

export default class ImportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: null,
      fileContent: null,
      validationResult: null,
      isImporting: false,
      importError: null,
    };
    this.fileInputRef = React.createRef();
  }

  onDownloadForImport = () => {
    const { entities, routes, layers, factions, sector, intl } = this.props;
    const sectorName = (sector || {}).name || intl.formatMessage({ id: 'misc.sector' });
    createJSONDownload(
      { ...entities, routes, layers, factions },
      `${sectorName} - ${dayjs().format('MMMM D, YYYY')} (import)`,
    );
  };

  onFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      let parsed;
      try {
        parsed = JSON.parse(event.target.result);
      } catch (_) {
        this.setState({
          fileName: file.name,
          fileContent: null,
          validationResult: { valid: false, errors: [{ entityId: null, entityName: null, field: 'file', message: 'File is not valid JSON' }] },
          importError: null,
        });
        return;
      }
      const validationResult = validateImport(parsed);
      this.setState({
        fileName: file.name,
        fileContent: parsed,
        validationResult,
        importError: null,
      });
    };
    reader.readAsText(file);
  };

  onImport = () => {
    const { fileContent } = this.state;
    const { importSector, closeImport, intl } = this.props;
    this.setState({ isImporting: true, importError: null });
    importSector(fileContent, intl)
      .then(() => {
        this.setState({ isImporting: false });
        closeImport();
      })
      .catch(err => {
        this.setState({
          isImporting: false,
          importError: (err && err.message) || intl.formatMessage({ id: 'misc.importFailed' }),
        });
      });
  };

  onCancel = () => {
    const { closeImport } = this.props;
    this.setState({ fileName: null, fileContent: null, validationResult: null, isImporting: false, importError: null });
    closeImport();
  };

  renderValidation() {
    const { validationResult } = this.state;
    if (!validationResult) return null;
    if (validationResult.valid) {
      return (
        <div className="ImportModal-Valid">
          <FormattedMessage id="misc.importFileValid" />
        </div>
      );
    }
    return (
      <div className="ImportModal-Errors">
        <div className="ImportModal-ErrorMsg">
          <FormattedMessage id="misc.importErrors" />
          {' '}({validationResult.errors.length})
        </div>
        {validationResult.errors.slice(0, 20).map((err, i) => (
          <div key={i} className="ImportModal-Error">
            <span className="ImportModal-ErrorField">
              {err.entityName ? `${err.entityName} → ` : ''}{err.field}:
            </span>{' '}
            {err.message}
          </div>
        ))}
        {validationResult.errors.length > 20 && (
          <div className="ImportModal-Error">
            …and {validationResult.errors.length - 20} more error(s)
          </div>
        )}
      </div>
    );
  }

  render() {
    const { isImportOpen, isSaved, intl } = this.props;
    const { fileName, validationResult, isImporting, importError } = this.state;
    const canImport = !!(validationResult && validationResult.valid && !isImporting);

    return (
      <Modal
        width={520}
        isOpen={isImportOpen}
        onCancel={this.onCancel}
        title={intl.formatMessage({ id: 'misc.importOptions' })}
        actionButtons={[
          <Button
            key="import"
            primary
            disabled={!canImport}
            onClick={this.onImport}
          >
            {isImporting ? (
              <FormattedMessage id="misc.loading" />
            ) : (
              <FormattedMessage id="misc.import" />
            )}
          </Button>,
        ]}
      >
        <p className="ImportModal-Section">
          <FormattedMessage id="misc.importDescription" />
        </p>

        {isSaved && (
          <FlexContainer align="center" className="ImportModal-Section">
            <Button onClick={this.onDownloadForImport}>
              <FormattedMessage id="misc.downloadForImport" />
            </Button>
          </FlexContainer>
        )}

        <FlexContainer align="center" className="ImportModal-Section">
          <input
            ref={this.fileInputRef}
            type="file"
            accept=".json,application/json"
            className="ImportModal-FileInput"
            onChange={this.onFileChange}
          />
          <Button onClick={() => this.fileInputRef.current.click()}>
            <FormattedMessage id="misc.importChooseFile" />
          </Button>
          {fileName && (
            <span className="ImportModal-FileName">{fileName}</span>
          )}
        </FlexContainer>

        {this.renderValidation()}

        {importError && (
          <div className="ImportModal-ErrorMsg">{importError}</div>
        )}
      </Modal>
    );
  }
}

ImportModal.propTypes = {
  isImportOpen: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  closeImport: PropTypes.func.isRequired,
  importSector: PropTypes.func.isRequired,
  entities: PropTypes.shape().isRequired,
  routes: PropTypes.shape().isRequired,
  layers: PropTypes.shape().isRequired,
  factions: PropTypes.shape().isRequired,
  sector: PropTypes.shape({
    name: PropTypes.string,
  }),
  intl: intlShape.isRequired,
};

ImportModal.defaultProps = {
  sector: undefined,
};
