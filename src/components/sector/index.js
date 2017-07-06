import { connect } from 'react-redux';

import Sector from './sector';

const mapStateToProps = state => ({
  columns: state.sector.columns,
  rows: state.sector.rows,
});

export default connect(
  mapStateToProps,
)(Sector);
