import { connect } from 'react-redux';

import PlanetInfo from './planet-info';

const mapStateToProps = ({ sector }, { routeParams }) => ({
  planet: sector.systems
    ? sector.systems[routeParams.system].planets[routeParams.planet] || {}
    : {},
});

export default connect(mapStateToProps)(PlanetInfo);
