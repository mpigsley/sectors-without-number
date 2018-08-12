import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  exportTypeSelector,
  isExportOpenSelector,
} from 'store/selectors/base.selectors';
import {
  getCurrentEntities,
  getCurrentSector,
} from 'store/selectors/entity.selectors';
import {
  setEntityExport,
  closeExport,
  startPrint,
} from 'store/actions/sector.actions';

import ExportModal from './export-modal';

const mapStateToProps = createStructuredSelector({
  exportType: exportTypeSelector,
  isExportOpen: isExportOpenSelector,
  sector: getCurrentSector,
  entities: getCurrentEntities,
});

export default injectIntl(
  connect(
    mapStateToProps,
    { setEntityExport, closeExport, startPrint },
  )(ExportModal),
);
