import { connect } from 'react-redux';

import Sector from './sector';

const mapStateToProps = ({ sector }) => ({
  renderSector: sector.renderSector,
  rows: sector.generated.rows,
  columns: sector.generated.columns,
  systems: sector.generated.systems,
});

export default connect(mapStateToProps)(Sector);
