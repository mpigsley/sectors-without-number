import { connect } from 'react-redux';

import SectorInfo from './sector-info';

const mapStateToProps = ({ sector }) => ({
  name: sector.generated.name,
  systems: sector.generated.systems
    ? Object.values(sector.generated.systems)
    : [],
});

export default connect(mapStateToProps)(SectorInfo);
