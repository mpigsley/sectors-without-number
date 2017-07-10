import { connect } from 'react-redux';

import Sector from './sector';

const mapStateToProps = state => ({
  renderSector: state.sector.renderSector,
  rows: state.sector.rows,
  columns: state.sector.columns,
  systems: state.sector.systems,
});

export default connect(mapStateToProps)(Sector);
