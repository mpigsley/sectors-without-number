import { connect } from 'react-redux';

import { makeGetCurrentPlanet } from 'store/selectors/sector.selectors';
import PlanetInfo from './planet-info';

const mapStateToProps = () => {
  const getCurrentPlanet = makeGetCurrentPlanet();
  return (state, props) => ({
    planet: getCurrentPlanet(state, props),
  });
};

export default connect(mapStateToProps)(PlanetInfo);
