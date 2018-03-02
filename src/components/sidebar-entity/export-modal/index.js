import { connect } from 'react-redux';

import { exportTypeSelector } from 'store/selectors/base.selectors';
import { setEntityExport } from 'store/actions/sector.actions';

import ExportModal from './export-modal';

const mapStateToProps = state => ({
  exportType: exportTypeSelector(state),
});

export default connect(mapStateToProps, { setEntityExport })(ExportModal);
