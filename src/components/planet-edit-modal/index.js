import { connect } from 'react-redux';

import {
  getPlanetKeys,
  getCurrentPlanets,
} from 'store/selectors/planet.selectors';

import PlanetEditModal from './planet-edit-modal';

const mapStateToProps = (state, props) => ({
  planetKeys: getPlanetKeys(state),
  planet: getCurrentPlanets(state)[props.planetKey],
});

export default connect(mapStateToProps)(PlanetEditModal);
