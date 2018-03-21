import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { exportTypeSelector } from 'store/selectors/base.selectors';
import { setEntityExport } from 'store/actions/sector.actions';

import ExportModal from './export-modal';

const mapStateToProps = state => ({
  exportType: exportTypeSelector(state),
});

export default injectIntl(
  connect(mapStateToProps, { setEntityExport })(ExportModal),
);
