import { connect } from 'react-redux';

import SectorInfo from './sector-info';

const mapStateToProps = ({ sector }) => ({
  name: sector.name,
  systems: sector.systems ? Object.values(sector.systems) : [],
});

export default connect(mapStateToProps)(SectorInfo);
