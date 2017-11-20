import { connect } from 'react-redux';

import { getCurrentPlanet } from 'store/selectors/planet.selectors';
import { editPlanet, deletePlanet } from 'store/actions/planet.actions';

import PlanetInfo from './planet-info';

const mapStateToProps = (state, props) => ({
  planet: getCurrentPlanet(state, props),
  planetKeys: [],
});

const mapDispatchToProps = dispatch => ({
  editPlanet: (system, planet) =>
    dispatch(editPlanet(system, planet.key, planet)),
  deletePlanet: (system, planet) => dispatch(deletePlanet(system, planet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanetInfo);
