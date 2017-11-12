import { connect } from 'react-redux';

import { getPlanetKeys } from 'store/selectors/planet.selectors';
import { getCurrentSector } from 'store/selectors/sector.selectors';

import PlanetEditModal from './planet-edit-modal';

const mapStateToProps = (state, props) => ({
  planetKeys: getPlanetKeys(state),
  planet: getCurrentSector(state).systems[props.systemKey].planets[
    props.planetKey
  ],
});

export default connect(mapStateToProps)(PlanetEditModal);
