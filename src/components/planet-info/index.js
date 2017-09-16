import { connect } from 'react-redux';

import {
  makeGetCurrentPlanet,
  getPlanetKeys,
} from 'store/selectors/planet.selectors';
import { editPlanet } from 'store/actions/planet.actions';

import PlanetInfo from './planet-info';

const mapStateToProps = () => {
  const getCurrentPlanet = makeGetCurrentPlanet();
  return (state, props) => ({
    planet: getCurrentPlanet(state, props),
    planetKeys: getPlanetKeys(state, props),
  });
};

const mapDispatchToProps = dispatch => ({
  editPlanet: (system, planet, changes) => {
    dispatch(editPlanet(system, planet, changes));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanetInfo);
