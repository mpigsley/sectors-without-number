import { connect } from 'react-redux';

import HexCanvas from './hex-canvas';

const mapStateToProps = state => ({
  renderSector: state.sector.renderSector,
  rows: state.sector.rows,
  columns: state.sector.columns,
});

export default connect(mapStateToProps)(HexCanvas);
