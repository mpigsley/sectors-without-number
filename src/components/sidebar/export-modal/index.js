import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  exportTypeSelector,
  isExportOpenSelector,
} from 'store/selectors/base.selectors';
import {
  setEntityExport,
  closeExport,
  startPrint,
} from 'store/actions/sector.actions';

import ExportModal from './export-modal';

const mapStateToProps = state => ({
  exportType: exportTypeSelector(state),
  isExportOpen: isExportOpenSelector(state),
});

export default injectIntl(
  connect(mapStateToProps, { setEntityExport, closeExport, startPrint })(
    ExportModal,
  ),
);
