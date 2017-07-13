import { connect } from 'react-redux';

import SectorInfo from './sector-info';

const mapStateToProps = state => ({
  name: state.sector.name,
});

export default connect(
  mapStateToProps,
)(SectorInfo);
