import { connect } from 'react-redux';

import { makeGetCurrentPlanet } from 'store/selectors/sector.selectors';
import { editPlanet } from 'store/actions/planet.actions';

import PlanetInfo from './planet-info';

const mapStateToProps = () => {
  const getCurrentPlanet = makeGetCurrentPlanet();
  return (state, props) => ({
    planet: getCurrentPlanet(state, props),
  });
};

const mapDispatchToProps = dispatch => ({
  editPlanetName: (system, planet, value) => {
    dispatch(editPlanet(system, planet, 'name', value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanetInfo);
